const SeatType = require("../models/seatTypeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new SeatType item
exports.createSeatType = catchAsyncErrors(async (req, res, next) => {
  const seatType = await SeatType.create(req.body);

  res.status(201).json({
    success: true,
    seatType,
  });
});

// Get all SeatType items
exports.getAllSeatTypes = catchAsyncErrors(async (req, res, next) => {
  const seatTypes = await SeatType.find();

  res.status(200).json({
    success: true,
    seatTypes,
  });
});

// Get single SeatType item by ID
exports.getSeatTypeById = catchAsyncErrors(async (req, res, next) => {
  const seatType = await SeatType.findById(req.params.id);

  if (!seatType) {
    return next(new ErrorHandler("SeatType item not found", 404));
  }

  res.status(200).json({
    success: true,
    seatType,
  });
});

// Update SeatType item
exports.updateSeatType = catchAsyncErrors(async (req, res, next) => {
  let seatType = await SeatType.findById(req.params.id);

  if (!seatType) {
    return next(new ErrorHandler("SeatType item not found", 404));
  }

  seatType = await SeatType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    seatType,
  });
});

// Delete SeatType item
exports.deleteSeatType = catchAsyncErrors(async (req, res, next) => {
  const seatType = await SeatType.findById(req.params.id);

  if (!seatType) {
    return next(new ErrorHandler("SeatType item not found", 404));
  }

  await seatType.remove();

  res.status(200).json({
    success: true,
    message: "SeatType item deleted successfully",
  });
});
