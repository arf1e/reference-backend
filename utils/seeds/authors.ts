import mongoose from 'mongoose';

export const authorsSeed = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Harold Abelson',
    birthDate: '1970-01-01',
    bio: 'Harold Abelson is a Professor of Electrical Engineering and Computer Science at MIT.',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Steve McConnell',
    birthDate: '1965-01-01',
    bio: 'Steve McConnell is an American software engineer, author, and consultant.',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Charles Petzold',
    birthDate: '1953-01-01',
    bio: 'Charles Petzold is an American programmer and technical author on Microsoft Windows applications.',
  },
];
