import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date },
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled', 'expired'],
      default: 'active',
    },
  },
  { timestamps: true }
);

subscriptionSchema.index({ user_id: 1 });
subscriptionSchema.index({ meal_id: 1 });

export default mongoose.model('Subscription', subscriptionSchema);
