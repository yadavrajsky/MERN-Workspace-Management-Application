const express = require("express");
const {
  createSeatType,
  getAllSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
} = require("../controllers/seatTypeController");
const router = express.Router();

router.route("/seatType").post(createSeatType).get(getAllSeatTypes);
router.route("/seatType/:id").get(getSeatTypeById).put(updateSeatType).delete(deleteSeatType);

module.exports = router;
