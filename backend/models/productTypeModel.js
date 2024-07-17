const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
    },
},{ timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
productTypeSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

productTypeSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("ProductType", productTypeSchema);
