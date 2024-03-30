import express from "express";
import {
  createAboutPagePost,
  getAboutPagePosts,
  deleteAboutPagePost,
  checkAboutPagePostExists,
} from "../controllers/aboutPageController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const aboutPagePostRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

aboutPagePostRoutes.get('/check', checkAboutPagePostExists);

aboutPagePostRoutes.post(
  "/create",
  userCheck,
  upload.array("image"),
  createAboutPagePost
);

aboutPagePostRoutes.get("/get", getAboutPagePosts);

aboutPagePostRoutes.delete("/delete/:postId", userCheck, deleteAboutPagePost);
