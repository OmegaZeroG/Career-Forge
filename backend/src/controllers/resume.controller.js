const path = require("path");
const Resume = require("../models/Resume.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const uploadResume = asyncHandler(async (req, res,next) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const ext = path
    .extname(req.file.originalname)
    .toLowerCase()
    .replace(".", "");

  const resume = await Resume.create({
    user: req.userId,
    fileName: req.file.filename,
    originalName: req.file.originalname,
    fileType: ext,
    fileSize: req.file.size,
    filePath: req.file.path,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { resume }, "Resume uploaded successfully"));
});

const getMyResumes = asyncHandler(async (req, res,next) => {
  const resumes = await Resume.find({
    user: req.userId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { resumes }, "Resumes fetched successfully"));
});

const deleteResume = asyncHandler(async (req, res,next) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  resume.isActive = false;
  await resume.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Resume deleted successfully"));
});

module.exports = { uploadResume, getMyResumes, deleteResume };
