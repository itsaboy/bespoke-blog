import express from "express";
import { loginUser, signupUser, logoutUser, refreshAccessToken } from "../controllers/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/login", loginUser)

userRoutes.post("/signup", signupUser)

userRoutes.get('/logout', logoutUser);

userRoutes.post('/refresh', refreshAccessToken);