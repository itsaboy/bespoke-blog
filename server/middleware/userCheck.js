import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const userCheck = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).select("_id role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Unauthorized - This action requires admin privileges",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else {
      console.error(error);
      return res
        .status(401)
        .json({ error: "Unauthorized - JWT malformed or invalid token" });
    }
  }
};
