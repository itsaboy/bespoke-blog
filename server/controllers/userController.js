import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const createAccessToken = (userId, userRole) => {
  return jwt.sign({ _id: userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const accessToken = createAccessToken(user._id, user.role);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res
      .status(200)
      .json({ username, accessToken, refreshToken, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    const accessToken = createAccessToken(user._id, user.role);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res
      .status(200)
      .json({ username, email, accessToken, refreshToken, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
