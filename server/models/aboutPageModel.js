import mongoose from "mongoose";
const { Schema, model } = mongoose;

const aboutPageSchema = new Schema({
    title: String,
    body: String,
    subBody: String,
    imageUrls: [String],
    createdAt: { type: Date, default: Date.now },
})

export const AboutPage = model('AboutPage', aboutPageSchema);