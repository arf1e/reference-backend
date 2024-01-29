import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../errors/ApiError';
import respondWith from '../utils/respondWith';
import { JsonWebTokenError } from 'jsonwebtoken';

export function errorLoggingMiddleware(
  error: typeof ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    respondWith(res, { code: error.code, message: error.message });
    return;
  }

  if (error instanceof mongoose.Error) {
    respondWith(res, { code: 400, message: error.message });
    return;
  }

  if (error instanceof mongoose.mongo.MongoError) {
    respondWith(res, { code: 400, message: error.message });
    return;
  }

  if (error instanceof JsonWebTokenError) {
    respondWith(res, { code: 403, message: error.message });
    return;
  }

  respondWith(res, { code: 500, message: 'Internal server error' });
  console.error(error); // So we could see the error in all of its ugliness in the console
}
