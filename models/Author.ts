import _ from 'lodash';
import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

authorSchema.virtual('booksCount', {
  ref: 'BookAuthor',
  localField: '_id',
  foreignField: 'authorId',
  count: true,
  autopopulate: true,
});

authorSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, returnedObject) => {
    return _.omit(returnedObject, 'id');
  },
});

authorSchema.plugin(autopopulate);

const Author = mongoose.model('Author', authorSchema);

export default Author;
