const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Handpicked = require("../models/handpickedModel");

// Create a new Handpicked item
exports.createHandpicked = catchAsyncErrors(async (req, res, next) => {
  const { isHandpicked } = req.body;

  const handpicked = await Handpicked.create({ isHandpicked });

  res.status(201).json({
    success: true,
    handpicked,
  });
});

// Get all Handpicked items
exports.getAllHandpicked = catchAsyncErrors(async (req, res, next) => {
  const handpickedItems = await Handpicked.find();

  res.status(200).json({
    success: true,
    handpickedItems,
  });
});

// Get single Handpicked item by ID
exports.getHandpickedById = catchAsyncErrors(async (req, res, next) => {
  const handpicked = await Handpicked.findById(req.params.id);

  if (!handpicked) {
    return next(new ErrorHandler("Handpicked item not found", 404));
  }

  res.status(200).json({
    success: true,
    handpicked,
  });
});

// Update Handpicked item
exports.updateHandpicked = catchAsyncErrors(async (req, res, next) => {
  let handpicked = await Handpicked.findById(req.params.id);

  if (!handpicked) {
    return next(new ErrorHandler("Handpicked item not found", 404));
  }

  handpicked = await Handpicked.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    handpicked,
  });
});

// Delete Handpicked item
exports.deleteHandpicked = catchAsyncErrors(async (req, res, next) => {
  const handpicked = await Handpicked.findById(req.params.id);

  if (!handpicked) {
    return next(new ErrorHandler("Handpicked item not found", 404));
  }

  await handpicked.remove();

  res.status(200).json({
    success: true,
    message: "Handpicked item deleted successfully",
  });
});
