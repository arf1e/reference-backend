import 'dotenv/config';
import 'dotenv-expand/config';
import Book from '../models/Book';
import Genre from '../models/Genre';
import Author from '../models/Author';
import { connectMongoDB } from '../config/mongoose';
import booksService from '../services/booksService';
import { genresSeed } from './seeds/genres';
import { authorsSeed } from './seeds/authors';
import { booksSeed } from './seeds/books';

async function drop() {
  await Genre.deleteMany({});
  await Author.deleteMany({});
  await Book.deleteMany({});
}

async function seed() {
  await drop();
  await Genre.create(genresSeed);
  await Author.create(authorsSeed);
  for (const book of booksSeed) {
    await booksService.createOne(book);
  }
}

connectMongoDB();

seed()
  .then(() => {
    console.log('🌱 Seed successful!');
    process.exit(0);
  })
  .catch((e) => {
    console.log('Seeding failed with error:');
    console.error(e);
    process.exit(1);
  });
