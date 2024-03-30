import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogPageSchema = new Schema({
    title: String,
    body: String,
    imageUrls: [String],
    createdAt: { type: Date, default: Date.now },
})

export const BlogPage = model('BlogPage', blogPageSchema);