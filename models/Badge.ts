const Schema = mongoose.Schema;

const badgeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
