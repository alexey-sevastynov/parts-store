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
  brand: { type: String, required: true },
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
  manufacturerWebsite: { type: String }, // Manufacturer's website
  analogs: [{ type: String }], // Links to product analogs or their names
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // References to reviews
  compatibleCars: [{ type: String }], // Car models compatible with the product

  availableVolumes: [{ type: Number }], // Available volumes of the product
  availability: { type: Boolean }, // Product availability
  quantityAvailable: { type: Number }, // Quantity of available products
  rating: { type: Number }, // Product rating
  // Other common fields if any
  characteristics: [], // Dynamic characteristics of the product
  // Other common fields
});

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
