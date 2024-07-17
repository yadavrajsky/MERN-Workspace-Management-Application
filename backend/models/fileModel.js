const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

// Add transform to remove __v, createdAt, and updatedAt
fileSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret.path;
    return ret;
  }
});

fileSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model("File", fileSchema);
