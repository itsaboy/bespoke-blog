import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import { BlogPost } from "../models/blogPostModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

const uploadImageToS3 = async (bucketName, file) => {
  const contentType =
    mime.getType(file.originalname) || "application/octet-stream";

  const uploadParams = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: contentType,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${file.originalname}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return null;
  }
};

export const createBlogPost = async (req, res) => {
  const { title, body } = req.body;
  const imageFiles = req.files;

  const imageUrls = await Promise.all(
    imageFiles.map((file) => uploadImageToS3(process.env.BUCKET_NAME, file))
  );

  try {
    const blogPost = new BlogPost({
      title,
      body,
      imageUrls: imageUrls.filter((url) => url !== null),
    });

    await blogPost.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully", blogPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Failed to create blog post" });
  }
};

export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error("Failed to retrieve blog posts:", error);
    res.status(500).json({ message: "Failed to retrieve blog posts" });
  }
};

export const getOneBlogPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Failed to retrieve the blog post:", error);
    res.status(500).json({ message: "Failed to retrieve the blog post" });
  }
};
