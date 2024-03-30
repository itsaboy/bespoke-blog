import express from "express";
import {
  createGalleryPagePost,
  getGalleryPagePosts,
  deleteGalleryPagePost,
  checkGalleryPagePostExists,
} from "../controllers/galleryPageController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const galleryPagePostRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

galleryPagePostRoutes.get('/check', checkGalleryPagePostExists);

galleryPagePostRoutes.post(
  "/create",
  userCheck,
  upload.array("image"),
  createGalleryPagePost
);

galleryPagePostRoutes.get("/get", getGalleryPagePosts);

galleryPagePostRoutes.delete("/delete/:postId", userCheck, deleteGalleryPagePost);
