import { v2 as cloudinary } from 'cloudinary';

export function setupCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  });
}
