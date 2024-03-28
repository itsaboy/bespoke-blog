import express from "express";
import {
  createImagePost,
  getImagePosts,
  getOneImagePost,
  deleteImagePost,
} from "../controllers/imagePostController.js";
import multer from "multer";

export const imagePostRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

imagePostRoutes.post("/create", upload.array("image"), createImagePost);

imagePostRoutes.get("/get", getImagePosts);

imagePostRoutes.get("/get/:postId", getOneImagePost);

imagePostRoutes.delete("/delete/:postId", deleteImagePost);