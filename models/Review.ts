import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const reviewSchema = new Schema({
  bookId: {
    type: ObjectId,
    ref: 'Book',
  },
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  badges: [
    {
      type: ObjectId,
      ref: 'Badge',
      autopopulate: true,
    },
  ],
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
