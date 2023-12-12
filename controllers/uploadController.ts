import { Request, Response } from 'express';
import handleCoverUpload, { handleAvatarUpload } from '../utils/handleFileUpload';
import respondWith from '../utils/respondWith';

async function uploadCover(req: Request, res: Response) {
  const fileUrl = await handleCoverUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

async function uploadAvatar(req: Request, res: Response) {
  const fileUrl = await handleAvatarUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

export default {
  uploadCover,
  uploadAvatar,
};
