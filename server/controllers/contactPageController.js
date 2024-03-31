import { ContactInfo } from "../models/contactPageModel.js";

export const createContactInfo = async (req, res) => {
  const { name, info, link } = req.body;

  try {
    const contactInfo = new ContactInfo({
      name,
      info,
      link,
    });

    await contactInfo.save();
    res
      .status(201)
      .json({ message: "Contact info created successfully", contactInfo });
  } catch (error) {
    console.error("Error creating contact info:", error);
    res.status(500).json({ message: "Failed to create contact info" });
  }
};

export const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.find().sort({ createdAt: -1 });
    res.status(200).json(contactInfo);
  } catch (error) {
    console.error("Failed to retrieve image posts:", error);
    res.status(500).json({ message: "Failed to retrieve image posts" });
  }
};

export const deleteContactInfo = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await ContactInfo.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    await ContactInfo.deleteOne({ _id: postId });
    res.status(200).send("Info deleted successfully");
  } catch (error) {
    console.error("Failed to delete the info:", error);
    res.status(500).send("Failed to delete the info");
  }
};

export const checkContactInfoExists = async (req, res) => {
  try {
    const existingPost = await ContactInfo.findOne();
    if (existingPost) {
      res.status(200).json({ exists: true, id: existingPost._id });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Failed to check for info:", error);
    res.status(500).json({ message: "Failed to check for info" });
  }
};
