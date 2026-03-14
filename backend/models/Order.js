import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
    subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    delivery_status: {
      type: String,
      enum: ['pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    delivery_date: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ user_id: 1 });
orderSchema.index({ meal_id: 1 });

export default mongoose.model('Order', orderSchema);
