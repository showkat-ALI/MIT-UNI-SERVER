import { Client as MinioClient } from 'minio';
import multer from 'multer';
import config from '../config'; // Assuming you have a config file for your project

const minioUpload = multer({ dest: 'uploads/' });

// MinIO client setup
const minioClient = new MinioClient({
  endPoint: 'localhost', // MinIO server address
  port: 9000, // MinIO server port
  useSSL: false, // Set to true if using HTTPS
  accessKey: config.minio_accessKey, // Replace with your MinIO access key
  secretKey: config.minio_secretKey, // Replace with your MinIO secret key
});

// Function to upload file to MinIO

export { minioClient, minioUpload };
