const express = require("express");
const {
  createMeetingRoom,
  getAllMeetingRooms,
  getMeetingRoomById,
  updateMeetingRoom,
  deleteMeetingRoom,
} = require("../../controllers/products/meetingRoomController");
const router = express.Router();

router.route("/meetingRoom").post(createMeetingRoom).get(getAllMeetingRooms);
router.route("/meetingRoom/:id").get(getMeetingRoomById).put(updateMeetingRoom).delete(deleteMeetingRoom);

module.exports = router;
