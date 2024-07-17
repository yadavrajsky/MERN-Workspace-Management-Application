const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const coworkingSpaceModel = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
      locality: {
        type: String,
        required: true,
        trim: true,
      },
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    creditsPerDeskPerMonth: {
      type: Number,
      required: true,
    },
    photos: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },],
    supportsParking: {
      type: Boolean,
      default: false,
    },
    supportsMetroConnectivity: {
      type: Boolean,
      default: false,
    },
    searchCount: {
      type: Number,
      default: 0,
    },
    description: { // Adding a description field for search
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Add a text index on all fields that are relevant for searching
coworkingSpaceModel.index({
  name: 'text',
  'location.locality': 'text', // assuming locality is a string field
  'description': 'text',
  'productType': 'text', // assuming you want to search by productType name
  'brand': 'text' // assuming you want to search by brand name
});

// Add transform to remove __v, createdAt, and updatedAt
coworkingSpaceModel.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

coworkingSpaceModel.set("toObject", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("CoworkingSpace", coworkingSpaceModel);
