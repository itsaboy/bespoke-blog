import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactInfoSchema = new Schema({
    name: String,
    info: String,
    link: String,
    createdAt: { type: Date, default: Date.now },
})

export const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);