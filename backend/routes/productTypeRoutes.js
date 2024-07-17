const express = require("express");
const { createProductType, getAllProductTypes, getProductTypeById, updateProductType, deleteProductType } = require("../controllers/productTypeController");
const router = express.Router();

router.route("/productTypes").post(createProductType).get(getAllProductTypes);
router.route("/productTypes/:id").get(getProductTypeById).put(updateProductType).delete(deleteProductType);

module.exports = router;
