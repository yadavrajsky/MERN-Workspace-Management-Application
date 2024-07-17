const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
}, { timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
brandSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

brandSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Brand", brandSchema);
