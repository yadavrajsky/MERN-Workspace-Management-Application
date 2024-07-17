const MeetingRoom = require("../../models/products/meetingRoomModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

// Create a new MeetingRoom item
exports.createMeetingRoom = catchAsyncErrors(async (req, res, next) => {
  const meetingRoom = await MeetingRoom.create(req.body);

  res.status(201).json({
    success: true,
    meetingRoom,
  });
});

// Get all MeetingRoom items
exports.getAllMeetingRooms = catchAsyncErrors(async (req, res, next) => {
  const meetingRooms = await MeetingRoom.find().populate('equipments').populate('brand');

  res.status(200).json({
    success: true,
    meetingRooms,
  });
});

// Get single MeetingRoom item by ID
exports.getMeetingRoomById = catchAsyncErrors(async (req, res, next) => {
  const meetingRoom = await MeetingRoom.findById(req.params.id).populate('equipments').populate('brand');

  if (!meetingRoom) {
    return next(new ErrorHandler("MeetingRoom item not found", 404));
  }

  res.status(200).json({
    success: true,
    meetingRoom,
  });
});

// Update MeetingRoom item
exports.updateMeetingRoom = catchAsyncErrors(async (req, res, next) => {
  let meetingRoom = await MeetingRoom.findById(req.params.id);

  if (!meetingRoom) {
    return next(new ErrorHandler("MeetingRoom item not found", 404));
  }

  meetingRoom = await MeetingRoom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    meetingRoom,
  });
});

// Delete MeetingRoom item
exports.deleteMeetingRoom = catchAsyncErrors(async (req, res, next) => {
  const meetingRoom = await MeetingRoom.findById(req.params.id);

  if (!meetingRoom) {
    return next(new ErrorHandler("MeetingRoom item not found", 404));
  }

  await meetingRoom.remove();

  res.status(200).json({
    success: true,
    message: "MeetingRoom item deleted successfully",
  });
});
