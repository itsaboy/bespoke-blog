import express from "express";
import {
  createContactInfo,
  getContactInfo,
  deleteContactInfo,
  checkContactInfoExists,
} from "../controllers/contactPageController.js";
import { userCheck } from "../middleware/userCheck.js";
import multer from "multer";

export const contactPageRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

contactPageRoutes.get("/check", checkContactInfoExists);

contactPageRoutes.post("/create", userCheck, upload.none(), createContactInfo);

contactPageRoutes.get("/get", getContactInfo);

contactPageRoutes.delete("/delete/:postId", userCheck, deleteContactInfo);
