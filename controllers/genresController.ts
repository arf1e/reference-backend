import { Request, Response } from 'express';

import genreService from '../services/genreService';
import { CreateGenreDTO } from '../types/genres';
import { ApiError } from '../errors/ApiError';

const getAllGenre = async (_req: Request, res: Response) => {
  const genreInDB = await genreService.getAll();
  res.status(200).json(genreInDB);
};

const getOneGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const foundGenre = await genreService.getOne(id);
  if (!foundGenre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  res.status(200).json(foundGenre);
};

const createGenre = async (req: Request, res: Response) => {
  const body = req.body as CreateGenreDTO;

  const newGenre = await genreService.create(body);
  res.status(201).json(newGenre);
};

const updateGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body as CreateGenreDTO;

  const updatedGenre = await genreService.update(id, body);
  res.status(200).json(updatedGenre);
};

const deleteGenre = async (req: Request, res: Response) => {
  const id = req.params.id;

  await genreService.remove(id);
  res.status(204).end();
};

export default {
  getAllGenre,
  getOneGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};