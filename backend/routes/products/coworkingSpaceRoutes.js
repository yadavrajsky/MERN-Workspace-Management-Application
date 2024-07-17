const express = require("express");
const router = express.Router();
const {
  createCoworkingSpace,
  getAllCoworkingSpaces,
  getCoworkingSpaceById,
  updateCoworkingSpace,
  deleteCoworkingSpace,
} = require("../../controllers/products/coworkingSpaceController");

// Create a new Coworking Space
router.post("/coworkingSpace", createCoworkingSpace);

// Get all Coworking Spaces
router.get("/coworkingSpaces", getAllCoworkingSpaces);

// Get a single Coworking Space by ID
router.get("/coworkingSpace/:id", getCoworkingSpaceById);

// Update a Coworking Space
router.put("/coworkingSpace/:id", updateCoworkingSpace);

// Delete a Coworking Space
router.delete("/coworkingSpace/:id", deleteCoworkingSpace);

module.exports = router;
