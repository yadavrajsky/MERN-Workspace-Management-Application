const mongoose = require("mongoose");

const seatTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
seatTypeSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

seatTypeSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("SeatType", seatTypeSchema);
