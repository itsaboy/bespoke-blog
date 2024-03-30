import express from "express";
import {
  createBlogPagePost,
  getBlogPagePosts,
  deleteBlogPagePost,
  checkBlogPagePostExists,
} from "../controllers/blogPageController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const blogPagePostRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

blogPagePostRoutes.get('/check', checkBlogPagePostExists);

blogPagePostRoutes.post(
  "/create",
  userCheck,
  upload.array("image"),
  createBlogPagePost
);

blogPagePostRoutes.get("/get", getBlogPagePosts);

blogPagePostRoutes.delete("/delete/:postId", userCheck, deleteBlogPagePost);
