const CoworkingSpace = require("../../models/products/coworkingSpaceModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

// Create a new Coworking Space
exports.createCoworkingSpace = catchAsyncErrors(async (req, res, next) => {
  const coworkingSpace = await CoworkingSpace.create(req.body);

  res.status(201).json({
    success: true,
    message: "Coworking Space created successfully",

  });
});





exports.getAllCoworkingSpaces = catchAsyncErrors(async (req, res, next) => {
  // Extract filters and search query from query parameters
  const {
    selectedProductType,
    selectedCity,
    selectedBrand,
    parking,
    metroConnectivity,
    search // New search parameter
  } = req.query;

  // Build the query object
  let query = { $or: [] };

  // Apply filters to the query object
  if (selectedProductType && selectedProductType !== '') {
    query.$or.push({ productType: selectedProductType });
  }

  if (selectedCity && selectedCity !== 'all') {
    query.$or.push({ 'location.city': selectedCity });
  }

  if (selectedBrand && selectedBrand !== '') {
    query.$or.push({ brand: selectedBrand });
  }

  if (parking !== undefined) {
    query.$or.push({ supportsParking: parking === 'true' }); // Convert 'true'/'false' string to boolean
  }

  if (metroConnectivity !== undefined) {
    query.$or.push({ supportsMetroConnectivity: metroConnectivity === 'true' }); // Convert 'true'/'false' string to boolean
  }

  // Add text search query if search term is provided
  if (search && search.trim() !== '') {
    query.$text = { $search: search.trim() };
  }

  // Handle case where no filters are applied
  if (query.$or.length === 0 && !query.$text) {
    // If no filters or search term are specified, fetch all coworking spaces
    query = {}; // This will return all documents
  }

  // Fetch filtered coworking spaces
  const coworkingSpaces = await CoworkingSpace.find(query)
    .populate({
      path: 'location.city',
      select: 'city',
    })
    .populate('productType', 'name')
    .populate('amenities', 'name description')
    .populate('brand', 'name')
    .populate('photos', 'url');

  res.status(200).json({
    success: true,
    coworkingSpaces,
  });
});

// Get single Coworking Space by ID
exports.getCoworkingSpaceById = catchAsyncErrors(async (req, res, next) => {
  const coworkingSpace = await CoworkingSpace.findById(req.params.id)
  .populate({
    path: 'location.city',
    select: 'city',
  })
  .populate('productType', 'name')
  .populate('amenities', 'name description')
  .populate('brand', 'name')
  .populate('photos', 'url'); 


  if (!coworkingSpace) {
    return next(new ErrorHandler("Coworking Space not found", 404));
  }

  res.status(200).json({
    success: true,
    coworkingSpace,
  });
});

// Update Coworking Space
exports.updateCoworkingSpace = catchAsyncErrors(async (req, res, next) => {
  let coworkingSpace = await CoworkingSpace.findById(req.params.id);

  if (!coworkingSpace) {
    return next(new ErrorHandler("Coworking Space not found", 404));
  }
console.log(req.body);
  coworkingSpace = await CoworkingSpace.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Coworking Space updated successfully",
    coworkingSpace,
  });
});

// Delete Coworking Space
exports.deleteCoworkingSpace = catchAsyncErrors(async (req, res, next) => {
  const coworkingSpace = await CoworkingSpace.findById(req.params.id);

  if (!coworkingSpace) {
    return next(new ErrorHandler("Coworking Space not found", 404));
  }

  await coworkingSpace.deleteOne();

  res.status(200).json({
    success: true,
    message: "Coworking Space deleted successfully",
  });
});
