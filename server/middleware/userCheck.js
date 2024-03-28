import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const userCheck = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id role");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
