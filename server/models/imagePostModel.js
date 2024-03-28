import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const imagePostSchema = new Schema({
  title: String,
  location: String,
  imageUrls: [String],
  createdAt: { type: Date, default: Date.now },
});

export const ImagePost = model('ImagePost', imagePostSchema);