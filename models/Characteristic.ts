// characteristicModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const multiLanguageSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

const characteristicSchema = new Schema({
  name: multiLanguageSchema,
  values: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CharacteristicValue' },
  ],
});

export default mongoose.models.Characteristic ||
  mongoose.model('Characteristic', characteristicSchema);
