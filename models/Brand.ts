import mongoose from 'mongoose';

const { Schema } = mongoose;

const brandSchema = new Schema({
  name: { type: String, required: true },
  website: String, // URL of the brand's website
});

export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);
