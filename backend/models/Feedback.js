import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
    vote_for_menu: { type: Boolean, default: false },
  },
  { timestamps: true }
);

feedbackSchema.index({ meal_id: 1 });
feedbackSchema.index({ user_id: 1, meal_id: 1 }, { unique: true });

export default mongoose.model('Feedback', feedbackSchema);
