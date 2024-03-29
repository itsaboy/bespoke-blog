import express from "express";
import { loginUser, signupUser, logoutUser } from "../controllers/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/login", loginUser)

userRoutes.post("/signup", signupUser)

userRoutes.get('/logout', logoutUser);