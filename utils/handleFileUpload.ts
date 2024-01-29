import { Request } from 'express';
import multiparty from 'multiparty';
import * as cloudinary from 'cloudinary';
import _ from 'lodash';
import { ApiError } from '../errors/ApiError';

const bookOptions: cloudinary.UploadApiOptions = {
  folder: 'referencelib-images',
  allowed_formats: ['jpg', 'png'],
  transformation: [
    {
      quality: 90,
    },
  ],
  eager: [{ width: 375, height: 500, crop: 'pad', background: 'gen_fill' }],
};

const avatarOptions: cloudinary.UploadApiOptions = {
  folder: 'referencelib-avatars',
  allowed_formats: ['jpg', 'png'],
  transformation: [
    {
      width: 375,
      aspect_ratio: '1:1',
      crop: 'fill',
      quality: 90,
    },
  ],
};

const authorOptions: cloudinary.UploadApiOptions = {
  folder: 'referencelib-authors',
  allowed_formats: ['jpg', 'png'],
  transformation: [
    {
      width: 375,
      aspect_ratio: '1:1',
      crop: 'fill',
      quality: 80,
      gravity: 'face',
      effect: 'grayscale',
    },
  ],
};

function extractFileFromRequest(req: Request) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (error, _fields, files) => {
      if (error) {
        console.log('error fileparser', error);
        reject(error);
      }
      const { path } = files.file[0];
      resolve(path);
    });
  });
}

export default async function handleCoverUpload(
  req: Request,
  uploadOptions: cloudinary.UploadApiOptions = bookOptions
) {
  const path = await extractFileFromRequest(req);
  const upload = await cloudinary.v2.uploader.upload(path as string, uploadOptions);
  const output = upload.eager[0].url;
  if (!output) {
    throw ApiError.badRequest('Image upload failed');
  }
  return output;
}

export async function handleAvatarUpload(req: Request) {
  const path = await extractFileFromRequest(req);
  const upload = await cloudinary.v2.uploader.upload(path as string, avatarOptions);
  return upload.url;
}

export async function handleAuthorImageUpload(req: Request) {
  const path = await extractFileFromRequest(req);
  const upload = await cloudinary.v2.uploader.upload(path as string, authorOptions);
  return upload.url;
}
