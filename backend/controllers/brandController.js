const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Brand = require("../models/brandModel");

// Create a new Brand
exports.createBrand = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const brand = await Brand.create({ name });

  res.status(201).json({
    success: true,
    brand,
    message: "Brand created successfully",
  });
});

// Get all Brands
exports.getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    success: true,
    brands,
  });
});

// Get single Brand by ID
exports.getBrandById = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Brand not found", 404));
  }

  res.status(200).json({
    success: true,
    brand,
  });
});

// Update Brand
exports.updateBrand = catchAsyncErrors(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Brand not found", 404));
  }

  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    brand,
    message: "Brand updated successfully",
  });
});

// Delete Brand
exports.deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Brand not found", 404));
  }

  await brand.deleteOne();

  res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
});
