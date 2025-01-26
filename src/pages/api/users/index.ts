import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import User, { IUser } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Handle user-related API requests (GET and POST for user creation)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure database connection
    await connectToDatabase();

    switch (req.method) {
      case "GET":
        try {
          const users: IUser[] = await User.find({});
          res.status(200).json({ success: true, data: users });
        } catch (error) {
          console.error("Error fetching users:", error);
          res.status(500).json({ success: false, error: "Failed to fetch users" });
        }
        break;

      case "POST":
        // Handle user creation for non-login requests
        try {
          const { name, email, password } = req.body;

          // Validate input
          if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
          }

          const jwtSecret = process.env.JWT_SECRET;
          if (!jwtSecret) {
            return res.status(500).json({ success: false, error: "JWT_SECRET not defined in environment variables" });
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create and save new user
          const newUser = new User({ name, email, password: hashedPassword });
          await newUser.save();

          // Generate JWT token using newUser._id and newUser.email
          const token = jwt.sign(
            { userId: newUser._id, username: newUser.name, email: newUser.email }, 
            jwtSecret, 
            { expiresIn: "1h" }
          );

          res.status(201).json({ success: true, token });
        } catch (error) {
          console.error("Error creating user:", error);
          res.status(400).json({
            success: false,
            error: "Failed to create user",
            details: process.env.NODE_ENV === "development" ? error : undefined,
          });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
