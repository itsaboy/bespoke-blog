import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  getOneBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController.js";
import multer from "multer";

export const blogPostRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

blogPostRoutes.post("/create", upload.array("image"), createBlogPost);

blogPostRoutes.get("/get", getBlogPosts);

blogPostRoutes.get("/get/:postId", getOneBlogPost);

blogPostRoutes.delete("/delete/:postId", deleteBlogPost);