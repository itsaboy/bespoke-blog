import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

// Configure the AWS S3 Client for version 3
const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_SECRET,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME,
    key: (req, file, cb) => {
      const location = req.body.location;
      const now = new Date();
      const batchFolder = `${location}/${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}/${now.getTime()}/`;
      cb(null, `${batchFolder}${file.originalname}`);
    },
  }),
});
