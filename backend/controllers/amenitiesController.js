const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Amenities = require("../models/amenitiesModel");

// Create a new Amenity
exports.createAmenity = catchAsyncErrors(async (req, res, next) => {
  const { name, description } = req.body;

  const amenity = await Amenities.create({ name, description });

  res.status(201).json({
    success: true,
    amenity,
    message: "Amenity created successfully"
  });
});

// Get all Amenities
exports.getAllAmenities = catchAsyncErrors(async (req, res, next) => {
  const amenities = await Amenities.find();

  res.status(200).json({
    success: true,
    amenities,
  });
});

// Get single Amenity by ID
exports.getAmenityById = catchAsyncErrors(async (req, res, next) => {
  const amenity = await Amenities.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Amenity not found", 404));
  }

  res.status(200).json({
    success: true,
    amenity,
  });
});

// Update Amenity
exports.updateAmenity = catchAsyncErrors(async (req, res, next) => {
  let amenity = await Amenities.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Amenity not found", 404));
  }

  amenity = await Amenities.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    amenity,
    message: "Amenity updated successfully"
  });
});

// Delete Amenity
exports.deleteAmenity = catchAsyncErrors(async (req, res, next) => {
  const amenity = await Amenities.findById(req.params.id);

  if (!amenity) {
    return next(new ErrorHandler("Amenity not found", 404));
  }

  await amenity.deleteOne();

  res.status(200).json({
    success: true,
    message: "Amenity deleted successfully",
  });
});
