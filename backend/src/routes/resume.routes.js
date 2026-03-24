const express = require("express");
const {
  uploadResume,
  getMyResumes,
  deleteResume,
} = require("../controllers/resume.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload } = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my", protect, getMyResumes);
router.delete("/:id", protect, deleteResume);

module.exports = router;
