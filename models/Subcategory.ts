// subcategoryModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const multiLanguageSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

const subcategorySchema = new Schema({
  name: multiLanguageSchema,
  imageUrl: String, // URL
  subSubcategories: [{ type: Schema.Types.ObjectId, ref: 'SubSubcategory' }],
});

export default mongoose.models.Subcategory ||
  mongoose.model('Subcategory', subcategorySchema);
