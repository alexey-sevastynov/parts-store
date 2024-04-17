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
    photo: { type: String },
    viewedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    likedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
