import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: {
      en: String, // English
      ru: String, // Russian
      ua: String, // Ukrainian
    },
    required: true,
  },
  category: [{ type: Schema.Types.ObjectId, ref: 'SubSubcategory' }],
  brand: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
  sku: { type: String, required: true }, // Product code
  price: { type: Number, required: true },
  salePrice: { type: Number }, // Discounted price
  photos: [{ type: String }], // Links to product photos
  description: {
    type: {
      en: String, // English
      ru: String, // Russian
      ua: String, // Ukrainian
    },
  },
  country: { type: String },

  analogs: [{ type: String }], // Links to product analogs or their names
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // References to reviews
  compatibleCars: [{ type: String }], // Car models compatible with the product

  availability: { type: Boolean }, // Product availability
  quantityAvailable: { type: Number }, // Quantity of available products
  rating: { type: Number }, // Product rating
  // Other common fields if any
  characteristics: [
    {
      name: {
        en: String,
        ru: String,
        ua: String,
      },
      value: {
        en: String,
        ru: String,
        ua: String,
      },
    },
  ],
  // Other common fields
});

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
