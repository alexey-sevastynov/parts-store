// characteristicValueModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const characteristicValueSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

export default mongoose.models.CharacteristicValue ||
  mongoose.model('CharacteristicValue', characteristicValueSchema);
