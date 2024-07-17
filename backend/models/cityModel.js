const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
citySchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

citySchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});


module.exports = mongoose.model("City", citySchema);
