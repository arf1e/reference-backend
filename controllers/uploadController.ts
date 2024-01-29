import { Request, Response } from 'express';
import handleCoverUpload, {
  handleAuthorImageUpload,
  handleAvatarUpload,
} from '../utils/handleFileUpload';
import respondWith from '../utils/respondWith';

async function uploadCover(req: Request, res: Response) {
  const fileUrl = await handleCoverUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

async function uploadAvatar(req: Request, res: Response) {
  const fileUrl = await handleAvatarUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

async function uploadAuthorImage(req: Request, res: Response) {
  const fileUrl = await handleAuthorImageUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

export default {
  uploadCover,
  uploadAvatar,
  uploadAuthorImage,
};
