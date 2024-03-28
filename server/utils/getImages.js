import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_SECRET,
  },
});

const listFolders = async (bucketName) => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Delimiter: "/",
  });

  try {
    const data = await s3Client.send(command);
    return data.CommonPrefixes.map((item) => item.Prefix);
  } catch (error) {
    console.error("Error listing folders:", error);
    return [];
  }
};

const listImagesInFolder = async (
  bucketName,
  folderPath,
  firstOnly = false
) => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: folderPath,
    MaxKeys: firstOnly ? 1 : undefined,
  });

  try {
    const data = await s3Client.send(command);
    return firstOnly ? [data.Contents[0]] : data.Contents;
  } catch (error) {
    console.error("Error listing objects:", error);
    return [];
  }
};

const constructS3Url = (bucketName, region, key) => {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

const getFirstImageFromEachFolder = async (bucketName) => {
  const bucketRegion = process.env.BUCKET_REGION;
  const folders = await listFolders(bucketName);

  const firstImageDetails = await Promise.all(
    folders.map(async (folderPath) => {
      const images = await listImagesInFolder(bucketName, folderPath, true);
      if (images.length > 0) {
        // Check if the array is not empty
        const firstImage = images[0]; // Directly use the first image
        const url = constructS3Url(bucketName, bucketRegion, firstImage.Key);
        const formattedDate = firstImage.LastModified
          ? firstImage.LastModified.toLocaleDateString("en-US")
          : "Unknown";
        return {
          folderName: folderPath.replace(/\/$/, ""),
          imageUrl: url, // Use the direct URL
          uploadDate: formattedDate,
        };
      }
      return null;
    })
  );

  return firstImageDetails.filter((item) => item !== null);
};

export const sendFirstImagesToClient = async (req, res) => {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const firstImageDetails = await getFirstImageFromEachFolder(bucketName);
    res.json(firstImageDetails); // Send the details directly
  } catch (error) {
    console.error("Error fetching first image URLs:", error);
    res.status(500).send("Error fetching first image URLs");
  }
};

export const sendImagesToClient = async (req, res) => {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const folderPath = req.query.location + `/`;
    const images = await listImagesInFolder(bucketName, folderPath);

    const urls = images.map((image) =>
      constructS3Url(bucketName, bucketRegion, image.Key)
    );

    res.json(urls);
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    res.status(500).send("Error fetching image URLs");
  }
};
