import mongoose from "mongoose";
const { Schema, model } = mongoose;

const homePageSchema = new Schema({
    title: String,
    body: String,
    imageUrls: [String],
    createdAt: { type: Date, default: Date.now },
})

export const HomePage = model('HomePage', homePageSchema);