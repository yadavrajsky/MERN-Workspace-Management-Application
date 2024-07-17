const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const City = require("../models/cityModel");

// Create a new City
exports.createCity = catchAsyncErrors(async (req, res, next) => {
  const { city, country } = req.body;

  const cityObj = await City.create({ city, country });

  res.status(201).json({
    success: true,
    city:cityObj,
    message: "City created successfully",
  });
});

// Get all Cities
exports.getAllCities = catchAsyncErrors(async (req, res, next) => {
  const cities = await City.find();

  res.status(200).json({
    success: true,
    cities,
  });
});

// Get single City by ID
exports.getCityById = catchAsyncErrors(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(new ErrorHandler("City not found", 404));
  }

  res.status(200).json({
    success: true,
    city,
  });
});

// Update City
exports.updateCity = catchAsyncErrors(async (req, res, next) => {
  let city = await City.findById(req.params.id);

  if (!city) {
    return next(new ErrorHandler("City not found", 404));
  }

  city = await City.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    city,
    message: "City updated successfully",
  });
});

// Delete City
exports.deleteCity = catchAsyncErrors(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(new ErrorHandler("City not found", 404));
  }

  await city.deleteOne();

  res.status(200).json({
    success: true,
    message: "City deleted successfully",
  });
});


