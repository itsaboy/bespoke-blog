import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import express from "express";
import mongoose from "mongoose";
import path from "path";
import * as url from "url";

import { userRoutes } from "./routes/user.js";
import { blogPostRoutes } from "./routes/blogPost.js";
import { upload } from "./utils/awsS3handler.js";
import { sendFirstImagesToClient, sendImagesToClient } from "./utils/getImages.js"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/user", userRoutes);

app.use("/api/blogPost", blogPostRoutes);

app.post("/api/upload", upload.array("images", 12), (req, res) => {
  res.status(200).json("Upload success!");
});

app.get("/api/location", sendFirstImagesToClient);

app.get("/api/images", sendImagesToClient);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
