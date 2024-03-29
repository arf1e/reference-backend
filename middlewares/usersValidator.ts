import { NextFunction, Request, Response } from 'express';
import { ChangeRoleSchema, UpdateUserDtoSchema, UserDtoSchema } from '../schemas/user';

export async function validateUserDtoInput(req: Request, res: Response, next: NextFunction) {
  try {
    await UserDtoSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function validateUserUpdateDtoInput(req: Request, res: Response, next: NextFunction) {
  try {
    await UpdateUserDtoSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function validateChangeRoleInput(req: Request, res: Response, next: NextFunction) {
  try {
    await ChangeRoleSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}
