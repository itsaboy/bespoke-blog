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

    // Store refreshToken in the database or wherever it needs to be
    user.refreshToken = refreshToken;
    await user.save();

    // Set tokens in HttpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "Strict",
      maxAge: 21600000, // 6 hours
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "Strict",
      maxAge: 604800000, // 7 days
    });

    // Return minimal user information
    res.status(200).json({ username: user.username, role: user.role });
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

    // Store refreshToken in the database or wherever it needs to be
    user.refreshToken = refreshToken;
    await user.save();

    // Set tokens in HttpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "Strict",
      maxAge: 21600000, // 6 hours
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "Strict",
      maxAge: 604800000, // 7 days
    });

    // Return minimal user information
    res
      .status(200)
      .json({ username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  // Clear the accessToken cookie
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiry to past date to delete the cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  // Clear the refreshToken cookie
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiry to past date to delete the cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  // Send a response to indicate successful logout
  res.status(200).json({ message: "Logout successful" });
};
