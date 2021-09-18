import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import generateJWT from "../utils/generateJWT.js";
import bcrypt from "bcryptjs";

/**
 * @desc   Register a new user
 * @route  POST /api/users/signup
 * @access Public
 * @param  {username, email, password}
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(409).json({
      message: "Username already exists",
    });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(409).json({
      message: "Email already exists",
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json({
      _id: user._id,
      userName: user.username,
      email: user.email,
      token: generateJWT(user),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc   Login user
 * @route  POST /api/users/login
 * @access Public
 * @param -{username, password}
 */
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && matchPassword) {
    res.json({
      _id: user._id,
      userName: user.username,
      email: user.email,
      token: generateJWT(user),
    });
  } else {
    res.status(401).json({
      message: "Invalid username or password",
    });
  }
};

/**
 * @desc  Get user profile and messages
 * @route GET /api/users/dashboard
 * @access Private
 */
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const messages = await Message.findById({ _id: user._id });
    res.json({
      _id: user._id,
      userName: user.username,
      email: user.email,
      messages,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

/**
 * @desc Update user info
 * @route PUT /api/users/update
 * @access Private
 */
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.username,
      email: updatedUser.email,
      token: generateJWT(updatedUser),
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
};
