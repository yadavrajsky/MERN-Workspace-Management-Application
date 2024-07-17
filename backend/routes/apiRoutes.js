const express = require('express');
const router = express.Router();

// Route Imports
const userRoutes = require("./userRoute");
const productTypeRoutes=require("./productTypeRoutes");
const cityRoutes = require("./cityRoutes");
const amenitiesRoutes = require("./amenitiesRoutes");
const handpickedRoutes = require("./handpickedRoutes");
const brandRoutes = require("./brandRoutes");
const equipmentRoutes = require("./equipmentRoutes");
const seatTypeRoutes = require("./seatTypeRoutes");
const fileRoutes = require("./fileRoutes");

const dailyPassRoutes = require("./products/dailyPassRoutes");
const meetingRoomRoutes = require("./products/meetingRoomRoutes");
const coworkingSpaceRoutes = require("./products/coworkingSpaceRoutes");
// Routes
router.use('', userRoutes);
router.use('', productTypeRoutes);
router.use('', cityRoutes);
router.use('', amenitiesRoutes);
router.use('', handpickedRoutes);
router.use('', brandRoutes);
router.use('', equipmentRoutes);
router.use('', dailyPassRoutes);
router.use('', meetingRoomRoutes);
router.use('', coworkingSpaceRoutes);
router.use('/file', fileRoutes);


module.exports = router;