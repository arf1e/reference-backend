import { Request } from 'express';
import multiparty from 'multiparty';
import * as cloudinary from 'cloudinary';
import _ from 'lodash';
import { ApiError } from '../errors/ApiError';

const options: cloudinary.UploadApiOptions = {
  folder: 'referencelib-images',
  allowed_formats: ['jpg', 'png'],
  transformation: [
    {
      quality: 90,
    },
  ],
  eager: [{ width: 375, height: 500, crop: 'pad', background: 'gen_fill' }],
};

function extractFileFromRequest(req: Request) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (error, _fields, files) => {
      if (error) {
        reject(error);
      }
      const { path } = files.file[0];
      resolve(path);
    });
  });
}

export default async function handleFileUpload(
  req: Request,
  uploadOptions: cloudinary.UploadApiOptions = options
) {
  const path = await extractFileFromRequest(req);
  const upload = await cloudinary.v2.uploader.upload(path as string, uploadOptions);
  const output = upload.eager[0].url;
  if (!output) {
    throw ApiError.badRequest('Image upload failed');
  }
  return output;
}
