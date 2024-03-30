import mongoose from "mongoose";
const { Schema, model } = mongoose;

const galleryPageSchema = new Schema({
    title: String,
    body: String,
    imageUrls: [String],
    createdAt: { type: Date, default: Date.now },
})

export const GalleryPage = model('GalleryPage', galleryPageSchema);