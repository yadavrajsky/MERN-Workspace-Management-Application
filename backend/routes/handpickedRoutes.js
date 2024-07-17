const express = require("express");
const {
  createHandpicked,
  getAllHandpicked,
  getHandpickedById,
  updateHandpicked,
  deleteHandpicked,
} = require("../controllers/handpickedController");
const router = express.Router();

router.route("/handpicked").post(createHandpicked).get(getAllHandpicked);
router.route("/handpicked/:id").get(getHandpickedById).put(updateHandpicked).delete(deleteHandpicked);

module.exports = router;
