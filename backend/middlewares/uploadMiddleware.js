const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const crypto = require("crypto");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToS3 = async (file) => {
  const fileStream = file.buffer;
  const fileExtension = path.extname(file.originalname);
  const fileName = `${crypto.randomBytes(16).toString("hex")}${fileExtension}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);

  await s3.send(command);

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

const uploadMultiple = upload.fields([
  { name: "image", maxCount: 1 }, // Campo para la imagen de la mascota
  { name: "vaccineCard", maxCount: 1 }, // Campo para el carnet de vacunas
]);

module.exports = { upload, uploadToS3, uploadMultiple };
