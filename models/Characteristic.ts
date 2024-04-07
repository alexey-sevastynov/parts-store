import mongoose from 'mongoose';

const { Schema } = mongoose;

const characteristicSchema = new Schema({
  name: {
    type: {
      en: String,
      ru: String,
      ua: String,
    },
    required: true,
  },
  value: {
    type: {
      en: Schema.Types.Mixed,
      ru: Schema.Types.Mixed,
      ua: Schema.Types.Mixed,
    },
    required: true,
  }, // any value
});

export default mongoose.models.Characteristic ||
  mongoose.model('Characteristic', characteristicSchema);
