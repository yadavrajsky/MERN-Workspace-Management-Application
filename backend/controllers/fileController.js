// controllers/fileController.js
const path = require("path");
const fs = require("fs");
const File = require("../models/fileModel"); // Adjust the path as necessary

exports.uploadFiles = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  let uploadedFiles = req.files.files;
  if (!Array.isArray(uploadedFiles)) {
    uploadedFiles = [uploadedFiles];
  }

  const uploadedFileDetails = [];

  try {
    for (const file of uploadedFiles) {
      const uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        Date.now() + path.extname(file.name)
      );

      // Move the file to the uploads directory
      await file.mv(uploadPath);
      const host = req.headers.host;
      const fileUrl = `http://${host}/uploads/${path.basename(uploadPath)}`;
      // Create a new file document and save to the database
      const newFile = new File({
        originalName: file.name,
        fileName: path.basename(uploadPath),
        path: uploadPath,
        size: file.size,
        url: fileUrl,
        mimeType: file.mimetype,
      });

      await newFile.save();
      uploadedFileDetails.push({
        _id: newFile._id,
        url: fileUrl,
      });
    }

    res.status(200).json({
      status: true,
      message: "Files uploaded successfully",
      files: uploadedFileDetails,
    });
  } catch (err) {
    res.status(500).json({ status:false, message: "File upload failed" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ status: false, message: "File not found" });
    }

    // Delete the file from the filesystem
    fs.unlink(file.path, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({status:false, message: "File deletion failed" });
      }

      // Delete the file document from the database
      await file.deleteOne();

      res.status(200).json({ status:true,message: "File deleted successfully",deletedFileId: req.params.id });
    });
  } catch (err) {
    res.status(500).json({status:false,  message: "File deletion failed"});
  }
};
