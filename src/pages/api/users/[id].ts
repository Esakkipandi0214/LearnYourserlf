import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import User, { IUser } from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const user: IUser | null = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
      }
      break;

    case "PUT":
      try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ error: "Failed to update user" });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json(deletedUser);
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
