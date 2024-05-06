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

// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const characteristicSchema = new Schema({
//   name: {
//     en: {
//       type: String,
//       required: true,
//     },
//     ru: {
//       type: String,
//       required: true,
//     },
//     ua: {
//       type: String,
//       required: true,
//     },
//   },
//   value: [
//     {
//       en: {
//         type: String,
//         required: true,
//       },
//       ru: {
//         type: String,
//         required: true,
//       },
//       ua: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
// });

// export default mongoose.models.Characteristic ||
//   mongoose.model('Characteristic', characteristicSchema);

// name: {
//   en: languageSchema,
//   ru: languageSchema,
//   ua: languageSchema,
// },
// value: [languageSchema],

//  name: {
//   en: {
//     type: String,
//     required: true,
//   },
//   ru: {
//     type: String,
//     required: true,
//   },
//   ua: {
//     type: String,
//     required: true,
//   },
// },
// value: [
//   {
//     en: {
//       type: String,
//       required: true,
//     },
//     ru: {
//       type: String,
//       required: true,
//     },
//     ua: {
//       type: String,
//       required: true,
//     },
//   },
// ], // массив значений

// const characteristic = {
//   name: { en: 'water', ru: 'вода', ua: 'water' },

//   listValue: [
//     { en: 'hot', ru: 'горячая', ua: 'горяча' },
//     { en: 'cold', ru: 'холодная', ua: 'холодна' },
//     { en: 'warm', ru: 'теплая', ua: 'тепла' },
//   ],
// };
