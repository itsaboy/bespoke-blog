import express from "express";
import {
  createHomePagePost,
  getHomePagePosts,
  deleteHomePagePost,
  checkHomePagePostExists,
} from "../controllers/homePageController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const homePagePostRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

homePagePostRoutes.get('/check', checkHomePagePostExists);

homePagePostRoutes.post(
  "/create",
  userCheck,
  upload.array("image"),
  createHomePagePost
);

homePagePostRoutes.get("/get", getHomePagePosts);

homePagePostRoutes.delete("/delete/:postId", userCheck, deleteHomePagePost);
