const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ProductType = require("../models/productTypeModel.js");

// Create a new Product Type
exports.createProductType = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  const productType = await ProductType.create({
    name,
  });

  res.status(201).json({
    success: true,
    productType,
    message: "Product Type created successfully",
  });
});

// Get all Product Types
exports.getAllProductTypes = catchAsyncErrors(async (req, res, next) => {
  const productTypes = await ProductType.find();

  res.status(200).json({
    success: true,
    productTypes,
  });
});

// Get single Product Type by ID
exports.getProductTypeById = catchAsyncErrors(async (req, res, next) => {
  const productType = await ProductType.findById(req.params.id);

  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }

  res.status(200).json({
    success: true,
    productType,
  });
});

// Update Product Type
exports.updateProductType = catchAsyncErrors(async (req, res, next) => {
  let productType = await ProductType.findById(req.params.id);

  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }

  productType = await ProductType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    productType,
    message: "Product Type updated successfully",
  });
});

// Delete Product Type
exports.deleteProductType = catchAsyncErrors(async (req, res, next) => {
  const productType = await ProductType.findById(req.params.id);

  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }

  await productType.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Type deleted successfully",
  });
});
