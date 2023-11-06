import { GenreDTO } from '../types/genres';
import GenreModel from '../models/Genre';
import { ApiError } from '../errors/ApiError';

const getAll = async () => {
  const gernes = await GenreModel.find();
  return gernes;
};

const getOne = async (id: string) => {
  const genre = await GenreModel.findById(id);
  if (!genre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  return genre;
};

const create = async (genre: GenreDTO) => {
  const newGenre = new GenreModel(genre);
  const savedGenre = await newGenre.save();
  return savedGenre;
};

const update = async (id: string, genre: GenreDTO) => {
  // By default, findByIdAndUpdate will return the document before the update was applied.
  const updatedGenre = await GenreModel.findByIdAndUpdate(id, genre, {
    returnDocument: 'after',
  });
  if (!updatedGenre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  return updatedGenre;
};

const remove = async (id: string) => {
  await GenreModel.findByIdAndDelete(id);
};

export default { getAll, getOne, create, update, remove };