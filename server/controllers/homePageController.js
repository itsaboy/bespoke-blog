import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import { HomePage } from "../models/homePageModel.js";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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
  const sanitizedTitle = postTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const timestamp = Date.now();
  const filename = file.originalname;
  const extension = mime.getExtension(file.mimetype);
  const newFilename = `${filename.split('.').slice(0, -1).join('.')}-${timestamp}.${extension}`;
  const key = `${sanitizedTitle}/${newFilename}`;

  const contentType = mime.getType(file.originalname) || 'application/octet-stream';

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

export const createHomePagePost = async (req, res) => {
  const { title, body } = req.body;
  const imageFiles = req.files;

  const imageUrls = await Promise.all(
    imageFiles.map((file) =>
      uploadImageToS3(process.env.BUCKET_NAME, file, title)
    )
  );

  try {
    const homePage = new HomePage({
      title,
      body,
      imageUrls: imageUrls.filter((url) => url !== null),
    });

    await homePage.save();
    res
      .status(201)
      .json({ message: "Content created successfully", homePage });
  } catch (error) {
    console.error("Error creating image post:", error);
    res.status(500).json({ message: "Failed to create content" });
  }
};

export const getHomePagePosts = async (req, res) => {
  try {
    const homePage = await HomePage.find().sort({ createdAt: -1 });
    res.status(200).json(homePage);
  } catch (error) {
    console.error("Failed to retrieve content:", error);
    res.status(500).json({ message: "Failed to retrieve content" });
  }
};

export const deleteHomePagePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await HomePage.findById(postId);
    if (!post) {
      return res.status(404).send("Content not found");
    }
    for (let imageUrl of post.imageUrls) {
      const key = imageUrl.split(process.env.BUCKET_NAME)[1].substring(1);
      await s3Client.send(
        new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key })
      );
    }
    await HomePage.deleteOne({ _id: postId });
    res.status(200).send("Content deleted successfully");
  } catch (error) {
    console.error("Failed to delete content:", error);
    res.status(500).send("Failed to delete content");
  }
};