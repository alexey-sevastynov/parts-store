import mongoose from 'mongoose';

const { Schema } = mongoose;

// Схема для многоязычных строк
const multiLanguageSchema = new Schema({
  en: String,
  ru: String,
  ua: String,
});

// Схема для бренда
const brandSchema = new Schema({
  name: String,
  website: String,
});

// Схема для характеристик продукта
const characteristicSchema = new Schema({
  name: multiLanguageSchema,
  value: multiLanguageSchema,
});

// Основная схема продукта
const productSchema = new Schema({
  name: {
    type: multiLanguageSchema,
    required: true,
  },
  category: {
    type: multiLanguageSchema,
    required: true,
  },
  brand: {
    type: brandSchema,
    required: true,
  },
  sku: { type: String, required: true }, // Код продукта
  price: { type: Number, required: true },
  salePrice: { type: Number }, // Цена со скидкой
  photos: [{ type: String }], // Ссылки на фото продукта
  description: {
    type: multiLanguageSchema,
  },
  country: {
    type: multiLanguageSchema,
  },
  analogs: [{ type: String }], // Ссылки на аналоги продукта или их имена
  reviews: [{ type: String }], // Ссылки на отзывы
  compatibleCars: [{ type: String }], // Модели автомобилей, совместимые с продуктом
  availability: { type: Boolean }, // Наличие продукта
  quantityAvailable: { type: Number }, // Количество доступных продуктов
  rating: { type: Number }, // Рейтинг продукта
  characteristics: [characteristicSchema], // Характеристики продукта
  // // Другие общие поля при необходимости
});

// Экспорт модели
export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
