const path = require("path");
const Resume = require("../models/Resume.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const uploadResume = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const ext = path
      .extname(req.file.originalname)
      .toLowerCase()
      .replace(".", "");

    const filePath = req.file.path;

    // ✅ CREATE FORMDATA (IMPORTANT)
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    // 🔥 CALL AFFINDA API (FIXED)
    const affindaRes = await axios.post(
      "https://api.affinda.com/v2/resumes",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.AFFINDA_API_KEY}`,
          ...formData.getHeaders(), // 🔥 VERY IMPORTANT
        },
      }
    );

    console.log("AFFINDA RESPONSE:", affindaRes.data);

    const parsed = affindaRes.data.data;

    // ✅ SAVE WITH PARSED DATA
    const resume = await Resume.create({
      user: req.userId,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType: ext,
      fileSize: req.file.size,
      filePath: filePath,

      parsedData: {
        name: parsed.name?.raw || "",
        email: parsed.emails?.[0] || "",
        phone: parsed.phoneNumbers?.[0] || "",
        skills: parsed.skills?.map((s) => s.name) || [],
        experience: parsed.totalYearsExperience || "",
        education: parsed.education || [],
      },

      isParsed: true,
    });

    return res.status(201).json(
      new ApiResponse(201, { resume }, "Resume uploaded & parsed successfully")
    );

  } catch (err) {
  console.log("FULL ERROR:", err.response?.data || err);

  return res.status(500).json({
    success: false,
    message: err.response?.data || err.message,
  });
}
});

const getMyResumes = asyncHandler(async (req, res, next) => {
  const resumes = await Resume.find({
    user: req.userId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { resumes }, "Resumes fetched successfully"));
});

const deleteResume = asyncHandler(async (req, res, next) => {
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