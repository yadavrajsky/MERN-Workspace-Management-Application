const DailyPass = require("../../models/products/dailyPassModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

// Create a new DailyPass item
exports.createDailyPass = catchAsyncErrors(async (req, res, next) => {
  const dailyPass = await DailyPass.create(req.body);

  res.status(201).json({
    success: true,
    dailyPass,
  });
});

// Get all DailyPass items
exports.getAllDailyPasses = catchAsyncErrors(async (req, res, next) => {
  const dailyPasses = await DailyPass.find().populate('amenities').populate('brand');

  res.status(200).json({
    success: true,
    dailyPasses,
  });
});

// Get single DailyPass item by ID
exports.getDailyPassById = catchAsyncErrors(async (req, res, next) => {
  const dailyPass = await DailyPass.findById(req.params.id).populate('amenities').populate('brand');

  if (!dailyPass) {
    return next(new ErrorHandler("DailyPass item not found", 404));
  }

  res.status(200).json({
    success: true,
    dailyPass,
  });
});

// Update DailyPass item
exports.updateDailyPass = catchAsyncErrors(async (req, res, next) => {
  let dailyPass = await DailyPass.findById(req.params.id);

  if (!dailyPass) {
    return next(new ErrorHandler("DailyPass item not found", 404));
  }

  dailyPass = await DailyPass.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    dailyPass,
  });
});

// Delete DailyPass item
exports.deleteDailyPass = catchAsyncErrors(async (req, res, next) => {
  const dailyPass = await DailyPass.findById(req.params.id);

  if (!dailyPass) {
    return next(new ErrorHandler("DailyPass item not found", 404));
  }

  await dailyPass.remove();

  res.status(200).json({
    success: true,
    message: "DailyPass item deleted successfully",
  });
});
