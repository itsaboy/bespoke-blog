import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import { BlogPage } from "../models/blogPageModel.js";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import mime from "mime";
import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_SECRET,
  },
});

const uploadImageToS3 = async (bucketName, file, postTitle) => {
  const sanitizedTitle = postTitle.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  const timestamp = Date.now();
  const filename = file.originalname;
  const extension = mime.getExtension(file.mimetype);
  const newFilename = `${filename
    .split(".")
    .slice(0, -1)
    .join(".")}-${timestamp}.${extension}`;
  const key = `${sanitizedTitle}/${newFilename}`;

  const contentType =
    mime.getType(file.originalname) || "application/octet-stream";

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: contentType,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return null;
  }
};

export const createBlogPagePost = async (req, res) => {
  const existingPosts = await BlogPage.find();
  for (let post of existingPosts) {
    for (let imageUrl of post.imageUrls) {
      const url = new URL(imageUrl);
      const key = url.pathname.substring(1);

      console.log("Deleting S3 Object with Key:", key);
      try {
        await s3Client.send(
          new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key })
        );
        console.log("Successfully deleted", key);
      } catch (error) {
        console.error("Error deleting image from S3 with key:", key, error);
      }
    }
    await BlogPage.deleteOne({ _id: post._id });
  }

  const { title, body } = req.body;
  const imageFiles = req.files;

  const imageUrls = await Promise.all(
    imageFiles.map((file) =>
      uploadImageToS3(process.env.BUCKET_NAME, file, title)
    )
  );

  try {
    const blogPage = new BlogPage({
      title,
      body,
      imageUrls: imageUrls.filter((url) => url !== null),
    });

    await blogPage.save();
    res.status(201).json({ message: "Content created successfully", blogPage });
  } catch (error) {
    console.error("Error creating image post:", error);
    res.status(500).json({ message: "Failed to create content" });
  }
};

export const getBlogPagePosts = async (req, res) => {
  try {
    const blogPage = await BlogPage.find().sort({ createdAt: -1 });
    res.status(200).json(blogPage);
  } catch (error) {
    console.error("Failed to retrieve content:", error);
    res.status(500).json({ message: "Failed to retrieve content" });
  }
};

export const deleteBlogPagePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await BlogPage.findById(postId);
    if (!post) {
      return res.status(404).send("Content not found");
    }
    for (let imageUrl of post.imageUrls) {
      const key = imageUrl.split(process.env.BUCKET_NAME)[1].substring(1);
      await s3Client.send(
        new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key })
      );
    }
    await BlogPage.deleteOne({ _id: postId });
    res.status(200).send("Content deleted successfully");
  } catch (error) {
    console.error("Failed to delete content:", error);
    res.status(500).send("Failed to delete content");
  }
};

export const checkBlogPagePostExists = async (req, res) => {
  try {
    const existingPost = await BlogPage.findOne();
    if (existingPost) {
      res.status(200).json({ exists: true, id: existingPost._id });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Failed to check for existing content:", error);
    res.status(500).json({ message: "Failed to check for existing content" });
  }
};
