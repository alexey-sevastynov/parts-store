// categoryModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const multiLanguageSchema = {
  en: String,
  ru: String,
  ua: String,
};

const categorySchema = new Schema({
  name: multiLanguageSchema,
  imageUrl: String, // URL
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
});

export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema);

// const modelExample = {
//   name: 'Запчастини для ТО',
//   imageUrl: 'https://example-icons.png',
//   subcategories: [
//     {
//       name: 'Оливи',
//       imageUrl: 'https://example-icons.png',
//       subSubcategories: [
//         {
//           name: 'W-20',
//           imageUrl: 'https://example-icons.png',
//           description: 'lorem lorem lorem 20',
//         },
//         {
//           name: 'W-30',
//           imageUrl: 'https://example-icons.png',
//           description: 'lorem lorem lorem 30',
//         },
//         {
//           name: 'W-40',
//           imageUrl: 'https://example-icons.png',
//           description: 'lorem lorem lorem 40',
//         },
//       ],
//     },
//     {
//       name: 'Рідина',
//       imageUrl: 'https://example-icons.png',
//     },
//     {
//       name: 'Вода',
//       imageUrl: 'https://example-icons.png',
//     },
//     {
//       name: 'Антифріз',
//       imageUrl: 'https://example-icons.png',
//     },
//   ],
// };
