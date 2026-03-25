const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
        console.log(`ForgeCareer API running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });

const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

//const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const response = await axios.post(
      "https://api.affinda.com/v2/resumes",
      fs.createReadStream(filePath),
      {
        headers: {
          "Authorization": "Bearer aff_0ced6a43ef4c1dcab0af772b7d2464b8345d27d6",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    fs.unlinkSync(filePath);

    res.json(response.data);
     console.log("AFFINDA RESPONSE:", response.data); // 👈 ADD THIS

    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error parsing resume");
  }
});

app.listen(5000, () => console.log("Server running"));