// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController'); // Adjust the path as necessary

router.post('/upload', fileController.uploadFiles);
router.delete('/delete/:id', fileController.deleteFile);

module.exports = router;
