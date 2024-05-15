// categoryModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const multiLanguageSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

const categorySchema = new Schema({
  name: multiLanguageSchema,
  iconUrl: String, // URL
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
});

export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema);
