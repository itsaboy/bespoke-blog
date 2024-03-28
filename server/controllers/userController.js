import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const createToken = (userId, userRole) => {
  return jwt.sign({ _id: userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id, user.role);
    res.status(200).json({ username, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id, user.role);
    res.status(200).json({ username, email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
