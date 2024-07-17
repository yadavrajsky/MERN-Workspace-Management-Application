const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const dailyPassSchema = new mongoose.Schema(
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
    openingTime: {
      type: Date,
      required: true,
    },
    closingTime: {
      type: Date,
      required: true,
    },
    openingWeekDay: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    closingWeekDay: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
      },
    ],
    spaceType: {
      type: String,
      enum: ["Coworking Space", "Work Cafe"],
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    CreditsPerDay: {
      type: Number,
      required: true,
    },
    photos: {
      coverImage: {
        type: String,
        required: true,
      },
      others: [
        {
          type: String,
        },
      ],
    },
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
  },
  { timestamps: true }
);

// Add transform to remove __v, createdAt, and updatedAt
dailyPassSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

dailyPassSchema.set("toObject", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("DailyPass", dailyPassSchema);
