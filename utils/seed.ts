import 'dotenv/config';
import 'dotenv-expand/config';
import Book from '../models/Book';
import Genre from '../models/Genre';
import Author from '../models/Author';
import mongoose from 'mongoose';
import { connectMongoDB } from '../config/mongoose';
import booksService from '../services/booksService';
import { BookDto } from '../types/books';

const genres = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Software Fundamentals',
  },
];

const authors = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Harold Abelson',
    birthDate: '1970-01-01',
    bio: 'Harold Abelson is a Professor of Electrical Engineering and Computer Science at MIT.',
  },
];

const books = [
  {
    isbn: '9785820600302',
    title: 'Structure and Interpretation of Computer Programs',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX331_BO1,204,203,200_.jpg',
    publisher: 'MIT Press',
    publishedDate: '1996-08-01',
    status: 'available' as BookDto['status'],
    genres: [genres[0]._id.toString()],
    authors: [authors[0]._id.toString()],
  },
];

async function drop() {
  await Genre.deleteMany({});
  await Author.deleteMany({});
  await Book.deleteMany({});
}

async function seed() {
  await drop();
  await Genre.create(genres);
  await Author.create(authors);
  for (const book of books) {
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
