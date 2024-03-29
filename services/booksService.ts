import _ from 'lodash';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import BookAuthor from '../models/BookAuthor';
import BookGenre from '../models/BookGenre';
import { BookDto, FindAllBooksOptions } from '../types/books';
import { composePaginationOutput } from '../utils/pagination';

async function preventBookDuplicate(isbn: string) {
  const bookExists = await Book.findByIsbn(isbn);
  if (bookExists) {
    throw ApiError.badRequest('Provided ISBN already exists');
  }
}

async function assignAuthorsToBook(bookId: string, authors: string[]) {
  const bookAuthors = authors.map((authorId) => ({
    bookId,
    authorId,
  }));
  await BookAuthor.insertMany(bookAuthors);
}

async function assignGenresToBook(bookId: string, genres: string[]) {
  const bookGenres = genres.map((genreId) => ({
    bookId,
    genreId,
  }));
  await BookGenre.insertMany(bookGenres);
}

async function findAll(options: FindAllBooksOptions) {
  const { books, count } = await Book.findAllByOptions(options);
  const pagination = composePaginationOutput(count, options);
  return { books, pagination };
}

async function findOne(isbn: string) {
  const book = await Book.findByIsbn(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
  return book;
}

async function createOne(bookDto: BookDto) {
  const { isbn } = bookDto;
  await preventBookDuplicate(isbn);
  const newBook = new Book(bookDto);
  if (bookDto.authors) {
    await assignAuthorsToBook(newBook.id, bookDto.authors);
  }
  if (bookDto.genres) {
    await assignGenresToBook(newBook.id, bookDto.genres);
  }
  await newBook.save();
  return newBook;
}

async function updateOne(isbn: string, bookDto: BookDto) {
  if (isbn !== bookDto.isbn) {
    await preventBookDuplicate(bookDto.isbn);
  }
  const updatedBook = await Book.findOneAndUpdate({ isbn }, bookDto, { new: true });
  if (!updatedBook) {
    throw ApiError.resourceNotFound('Book not found');
  }
  if (bookDto.authors) {
    await BookAuthor.deleteMany({ bookId: updatedBook._id });
    await assignAuthorsToBook(updatedBook.id, bookDto.authors);
  }
  if (bookDto.genres) {
    await BookGenre.deleteMany({ bookId: updatedBook._id });
    await assignGenresToBook(updatedBook.id, bookDto.genres);
  }
  return findOne(updatedBook.isbn);
}

async function deleteOne(isbn: string) {
  const bookExists = await Book.exists({ isbn });
  if (!bookExists) {
    throw ApiError.resourceNotFound('Book not found');
  }
  await Book.findOneAndDelete({ isbn });
  await BookAuthor.deleteMany({ bookId: bookExists._id });
  await BookGenre.deleteMany({ bookId: bookExists._id });
}

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
