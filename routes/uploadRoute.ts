import express from 'express';
import uploadController from '../controllers/uploadController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';

export const uploadRouter = express.Router();

uploadRouter.post('/cover', passThrowsToMiddleware(uploadController.uploadCover));
uploadRouter.post('/avatar', passThrowsToMiddleware(uploadController.uploadAvatar));
