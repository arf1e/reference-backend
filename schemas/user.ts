import { z } from 'zod';
import { ROLEVALUES } from '../common/auth';

export const UserDtoSchema = z.object({
  email: z.string({ required_error: 'Please provide email' }).email(),
  password: z.string({ required_error: 'Please provide password' }).min(6),
  image: z.string({ required_error: 'Please provide image' }).url(),
  firstName: z.string({ required_error: 'Please provide first name' }).min(2).max(50),
  lastName: z.string({ required_error: 'Please provide last name' }).min(2).max(50),
});

export const UpdateUserDtoSchema = z.object({
  email: UserDtoSchema.shape.email,
  image: UserDtoSchema.shape.image,
  firstName: UserDtoSchema.shape.firstName,
  lastName: UserDtoSchema.shape.lastName,
});

export const ChangeRoleSchema = z.object({
  role: z.enum([ROLEVALUES.ADMIN, ROLEVALUES.USER]),
});
