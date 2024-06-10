import mongoose from 'mongoose';

const { Schema } = mongoose;

// Схема для многоязычных строк
const multiLanguage = {
  en: String,
  ru: String,
  ua: String,
};

// Схема для характеристик продукта

const CharacteristicProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Основная схема продукта
const productSchema = new Schema(
  {
    name: multiLanguage,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },

    sku: { type: String, required: true }, // Код продукта
    price: { type: Number, required: true },
    salePrice: Number, // Цена со скидкой
    photos: { type: String, required: true },

    // Ссылки на фото продукта
    description: {
      en: String,
      ru: String,
      ua: String,
    },
    country: multiLanguage,
    analogs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }, // Ссылки на аналоги продукта или их имена
    reviews: String, // Ссылки на отзывы
    compatibleCars: String, // Модели автомобилей, совместимые с продуктом

    quantityAvailable: Number, // Количество доступных продуктов
    // rating: { type: Number }, // Рейтинг продукта

    characteristics: [CharacteristicProductSchema],
  },
  { timestamps: true }
);

// Экспорт модели
export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
