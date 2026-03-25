const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    // 🔥 PARSED DATA (FIXED)
    parsedData: {
      rawText: { type: String, default: "" },

      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },

      skills: [
        {
          type: String,
        },
      ],

      experience: {
        type: String,
        default: "",
      },

      // ✅ FIXED EDUCATION (ARRAY OF OBJECTS)
      education: [
        {
          organization: { type: String, default: "" },
          degree: { type: String, default: "" },
          startDate: { type: String, default: "" },
          endDate: { type: String, default: "" },
        },
      ],
    },

    isParsed: {
      type: Boolean,
      default: false,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);