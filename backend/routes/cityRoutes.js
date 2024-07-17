const express = require("express");
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");
const router = express.Router();

router.route("/cities").post(createCity).get(getAllCities);
router.route("/cities/:id").get(getCityById).put(updateCity).delete(deleteCity);

module.exports = router;
