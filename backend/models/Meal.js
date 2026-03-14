import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    homemaker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meal_name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    availability: { type: Boolean, default: true },
    image_url: { type: String, default: '' },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

mealSchema.index({ homemaker_id: 1 });
mealSchema.index({ availability: 1 });

export default mongoose.model('Meal', mealSchema);
