import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Handle only POST method for login
    if (req.method === "POST") {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
      }

      try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, error: "User not found" });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        // Check if JWT_SECRET is set
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return res.status(500).json({ success: false, error: "JWT_SECRET not defined in environment variables" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id,username:user.name ,email: user.email }, jwtSecret, { expiresIn: "1h" });

        res.status(200).json({ success: true, message: "Login successful", token });
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    } else {
      // If method is not POST
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
