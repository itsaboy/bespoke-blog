import express from "express";
import {
  createImagePost,
  getImagePosts,
  getOneImagePost,
  deleteImagePost,
} from "../controllers/imagePostController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const imagePostRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

imagePostRoutes.post(
  "/create",
  userCheck,
  upload.array("image"),
  createImagePost
);

imagePostRoutes.get("/get", getImagePosts);

imagePostRoutes.get("/get/:postId", getOneImagePost);

imagePostRoutes.delete("/delete/:postId", userCheck, deleteImagePost);
