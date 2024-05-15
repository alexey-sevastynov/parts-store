// subSubcategoryModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const multiLanguageSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

const subSubcategorySchema = new Schema({
  name: multiLanguageSchema,
  imageUrl: String, // URL
  description: String,
});

export default mongoose.models.SubSubcategory ||
  mongoose.model('SubSubcategory', subSubcategorySchema);
