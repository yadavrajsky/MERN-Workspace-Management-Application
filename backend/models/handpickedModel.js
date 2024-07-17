const mongoose = require("mongoose");

const handpickedSchema = new mongoose.Schema({
  isHandpicked: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
handpickedSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

handpickedSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Handpicked", handpickedSchema);
