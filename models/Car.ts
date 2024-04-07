import mongoose from 'mongoose';

const { Schema } = mongoose;

const carSchema = new Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  VIN: { type: String }, // Vehicle Identification Number
  fuelType: { type: String }, // Fuel type
  engineCapacity: { type: Number }, // Engine displacement
  bodyType: { type: String }, // Body type
  transmission: { type: String }, // Transmission

  features: [{ type: String }], // other features
});

export default mongoose.models.Car || mongoose.model('Car', carSchema);
