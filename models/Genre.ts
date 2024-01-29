import _ from 'lodash';
import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const GenreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

GenreSchema.virtual('booksCount', {
  ref: 'BookGenre',
  localField: '_id',
  foreignField: 'genreId',
  count: true,
  autopopulate: true,
});

GenreSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, returnedObject) => {
    return _.omit(returnedObject, 'id');
  },
});

GenreSchema.plugin(autopopulate);

const GenreModel = mongoose.model('Genre', GenreSchema);
export default GenreModel;
