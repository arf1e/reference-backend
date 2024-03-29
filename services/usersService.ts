import { Role, UserDto, UserType, UserUpdateDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import _ from 'lodash';

const findAll = async () => {
  const users = await UserModel.find().select('-password');
  return users;
};

const findOne = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  return user;
};

const findOneByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const createOne = async (userDto: UserDto) => {
  const user = await UserModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserUpdateDto) => {
  const protectedInput = _.omit(userDto, ['password', 'role']);
  const updatedUser = await UserModel.findByIdAndUpdate(id, protectedInput, {
    new: true,
  });

  if (!updatedUser) {
    throw ApiError.resourceNotFound('User not found');
  }
  return updatedUser;
};

const deleteOne = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return;
  }
  const booksBorrowedByUser = await Book.find({ borrowerId: id });
  if (booksBorrowedByUser.length > 0) {
    await Book.return(
      booksBorrowedByUser.map((book) => book.id),
      id
    );
  }
  await UserModel.findByIdAndDelete(id);
};

const borrowBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId);
  const borrowedBooksIds = await Book.borrow(bookIds, user.id);
  return borrowedBooksIds;
};

const returnBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId);
  const returnedBooksIds = await Book.return(bookIds, user.id);
  return returnedBooksIds;
};

const changeRole = async (userId: string, role: Role) => {
  const user = await findOne(userId);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  const updatedUser = await UserModel.findByIdAndUpdate(user.id, { role }, { new: true });
  return updatedUser as UserType;
};

export default {
  findAll,
  findOne,
  createOne,
  findOneByEmail,
  updateOne,
  deleteOne,
  borrowBooks,
  returnBooks,
  changeRole,
};
