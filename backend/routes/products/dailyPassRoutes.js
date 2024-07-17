const express = require("express");
const { getAllDailyPasses, createDailyPass, getDailyPassById, updateDailyPass, deleteDailyPass } = require("../../controllers/products/dailyPassController");

const router = express.Router();

router.route("/dailyPass").post(createDailyPass).get(getAllDailyPasses);
router.route("/dailyPass/:id").get(getDailyPassById).put(updateDailyPass).delete(deleteDailyPass);

module.exports = router;
