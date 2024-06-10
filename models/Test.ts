import mongoose from 'mongoose';

const { Schema } = mongoose;

// Схема для многоязычных строк
const multiLanguage = {
  en: String,
  ru: String,
  ua: String,
};

// Основная схема продукта
const testSchema = new Schema({
  name: multiLanguage,
});
// Экспорт модели
export default mongoose.models.Test || mongoose.model('Test', testSchema);
