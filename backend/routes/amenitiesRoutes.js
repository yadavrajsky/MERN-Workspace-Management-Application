const express = require("express");
const {
  createAmenity,
  getAllAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenitiesController");
const router = express.Router();

router.route("/amenities").post(createAmenity).get(getAllAmenities);
router.route("/amenities/:id").get(getAmenityById).put(updateAmenity).delete(deleteAmenity);

module.exports = router;
