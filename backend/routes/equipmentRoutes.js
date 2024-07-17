const express = require("express");
const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipmentController");
const router = express.Router();

router.route("/equipment").post(createEquipment).get(getAllEquipment);
router.route("/equipment/:id").get(getEquipmentById).put(updateEquipment).delete(deleteEquipment);

module.exports = router;
