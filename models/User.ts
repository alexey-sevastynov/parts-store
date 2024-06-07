import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    provider: { type: String, default: 'credentials' },
    role: { type: String, default: 'user' },
    isBlocked: { type: Boolean, default: false },
    photo: { type: String },
    viewedProducts: [{ type: String }],
    cart: [{ type: String }],
    likedProducts: [{ type: String }],
    cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
