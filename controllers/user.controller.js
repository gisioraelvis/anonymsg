import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import generateJWT from "../utils/generateJWT.js";
import bcrypt from "bcryptjs";
import {
  registrationValidation,
  loginValidation,
} from "../utils/validation.js";

/**
 * @desc   Check if a username exist
 * @route  GET /api/users/:username
 * @access Public
 * @param  {username}
 */
export const getUser = async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });

  if (user) {
    res.status(200).json({ id: user._id, username: user.username });
    return;
  } else {
    res.status(404).json({ message: "Username doesn't exist" });
    return;
  }
};
/**
 * @desc   Register a new user
 * @route  POST /api/users/signup
 * @access Public
 * @param  {username, email, password}
 */
export const register = async (req, res) => {
  //validate the user input
  const { error } = registrationValidation(req.body);
  if (error) return res.status(422).json({ message: error.details[0].message });
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(409).json({
      message: "Username already exists",
    });
    return;
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(409).json({
      message: "Email already exists",
    });
    return;
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({
      _id: user._id,
      userName: user.username,
      email: user.email,
      message: "User created",
      token: generateJWT(user),
    });
    return;
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
};

/**
 * @desc   Login user
 * @route  POST /api/users/login
 * @access Public
 * @param -{username, password}
 */
export const login = async (req, res) => {
  //validate the user input
  const { error } = loginValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        message: "Username doesn't exist",
      });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(401).json({
        message: "Password is incorrect",
      });
      return;
    }

    if (user && matchPassword) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateJWT(user),
      });
      return;
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
    return;
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
    const usermessages = await Message.findOne({ user: user._id });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      usermessages,
    });
    return;
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
};

/**
 * @desc Update user info
 * @route PUT /api/users/update
 * @access Private
 */
export const updateUserProfile = async (req, res) => {
  const { username } = req.user;
  const user = await User.findOne({ username });
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      userName: updatedUser.username,
      email: updatedUser.email,
      token: generateJWT(updatedUser),
    });
    return;
  } else {
    res.status(400).json({ message: "User not found" });
    return;
  }
};
