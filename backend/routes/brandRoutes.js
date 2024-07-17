const express = require("express");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const router = express.Router();

router.route("/brands").post(createBrand).get(getAllBrands);
router.route("/brands/:id").get(getBrandById).put(updateBrand).delete(deleteBrand);

module.exports = router;
