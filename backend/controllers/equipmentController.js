const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Equipment = require("../models/equipmentModel");

// Create a new Equipment
exports.createEquipment = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const equipment = await Equipment.create({ name });

  res.status(201).json({
    success: true,
    equipment,
    message: "Equipment item created successfully",
  });
});

// Get all Equipment items
exports.getAllEquipment = catchAsyncErrors(async (req, res, next) => {
  const equipmentItems = await Equipment.find();

  res.status(200).json({
    success: true,
    equipmentItems,
  });
});

// Get single Equipment item by ID
exports.getEquipmentById = catchAsyncErrors(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(new ErrorHandler("Equipment item not found", 404));
  }

  res.status(200).json({
    success: true,
    equipment,
  });
});

// Update Equipment item
exports.updateEquipment = catchAsyncErrors(async (req, res, next) => {
  let equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(new ErrorHandler("Equipment item not found", 404));
  }

  equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    equipment,
    message: "Equipment item updated successfully",
  });
});

// Delete Equipment item
exports.deleteEquipment = catchAsyncErrors(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(new ErrorHandler("Equipment item not found", 404));
  }

  await equipment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Equipment item deleted successfully",
  });
});
