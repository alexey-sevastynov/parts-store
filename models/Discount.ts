import mongoose from 'mongoose';

const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discountPercentage: { type: Number, required: true },
    // Другие поля, которые могут понадобиться
  },
  { timestamps: true }
);

export default mongoose.models.Discount ||
  mongoose.model('Discount', discountSchema);
