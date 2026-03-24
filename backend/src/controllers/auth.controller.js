const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        token,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      "Registration successful",
    ),
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      "Login successful",
    ),
  );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfully"));
});

module.exports = { register, login, getMe };
