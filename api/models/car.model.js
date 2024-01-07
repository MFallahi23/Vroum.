import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    vehiculeAge: {
      type: Number,
      required: true,
    },
    color: String,
    fuelType: String,
    Transmission: String,
    engine: String,
    type: String,
    city: String,
    price: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
