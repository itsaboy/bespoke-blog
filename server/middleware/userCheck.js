import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const userCheck = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Unauthorized - No authorization header" });
  }

  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Unauthorized - Incorrect token format" });
  }

  let tokenObject;
  try {
    tokenObject = JSON.parse(parts[1]);
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Token parsing error" });
  }

  const accessToken = tokenObject.accessToken;
  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized - accessToken not provided" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).select("_id role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({
          error: "Unauthorized - This action requires admin privileges",
        });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ error: "Unauthorized - JWT malformed or invalid token" });
  }
};
