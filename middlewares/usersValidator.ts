import { NextFunction, Request, Response } from 'express';
import { UserDtoSchema } from '../schemas/user';

export async function validateUserDtoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await UserDtoSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}
