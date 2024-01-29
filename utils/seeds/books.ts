import { BookDto } from '../../types/books';
import { authorsSeed } from './authors';
import { genresSeed } from './genres';

export const booksSeed = [
  {
    isbn: '9785820600302',
    title: 'Structure and Interpretation of Computer Programs',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX331_BO1,204,203,200_.jpg',
    publisher: 'MIT Press',
    publishedDate: '1996-08-01',
    status: 'available' as BookDto['status'],
    genres: [genresSeed[0]._id.toString()],
    authors: [authorsSeed[0]._id.toString()],
  },
  {
    isbn: '9780735619678',
    title: 'Code Complete',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX331_BO1,204,203,200_.jpg',
    publisher: 'Microsoft Press',
    publishedDate: '2004-07-07',
    status: 'available' as BookDto['status'],
    genres: [genresSeed[0]._id.toString()],
    authors: [authorsSeed[1]._id.toString()],
  },
  {
    isbn: '9780735611313',
    title: 'Code: The Hidden Language of Computer Hardware and Software',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX331_BO1,204,203,200_.jpg',
    publisher: 'Microsoft Press',
    publishedDate: '2000-10-11',
    status: 'available' as BookDto['status'],
    genres: [genresSeed[0]._id.toString()],
    authors: [authorsSeed[2]._id.toString()],
  },
];
