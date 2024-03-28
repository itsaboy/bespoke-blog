import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogPostSchema = new Schema({
  title: String,
  body: String,
  imageUrls: [String], // Array of URLs pointing to images stored in S3
  createdAt: { type: Date, default: Date.now },
});

export const BlogPost = model('BlogPost', blogPostSchema);
