const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const meetingRoomSchema = new mongoose.Schema(
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
    capacity: {
      type: String,
      enum: ["upto 4", "4+", "6+", "8+", "10+"],
      required: true,
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
    equipments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    creditsPerHour: {
      type: Number,
      required: true,
    },
    myHQHandpicked: {
        type: Boolean,
        default: false,
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
meetingRoomSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

meetingRoomSchema.set("toObject", {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("MeetingRoom", meetingRoomSchema);
