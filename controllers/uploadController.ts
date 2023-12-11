import { Request, Response } from 'express';
import handleFileUpload from '../utils/handleFileUpload';
import respondWith from '../utils/respondWith';

async function uploadFile(req: Request, res: Response) {
  const fileUrl = await handleFileUpload(req);
  respondWith(res, { code: 201, data: fileUrl });
}

export default {
  uploadFile,
};
