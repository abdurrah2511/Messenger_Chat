import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import generateToken from "../utils/generateToken.js";

import asyncHandler from "../middleware/asyncHandler.js";

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  // check missing fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });

});

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // check user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // response
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });

});