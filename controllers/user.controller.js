import User from "../models/user.model.js";
import generateJWT from "../utils/generateJWT.js";

/**
 * @desc   Register a new user
 * @route  POST /api/users/login
 * @access Public
 * @param  {username, password}
 */
export const login = (req, res, next) => {
  res.json("login...");
};

/**
 * @desc   Register a new user
 * @route  POST /api/users/signup
 * @access Public
 * @param  {username, email, password}
 */
export const register = (req, res, next) => {
  res.json("register...");
};

/**
 * @desc  Get user profile and messages
 * @route GET /api/users/dashboard
 * @access Private
 */
export const getUserProfile = (req, res, next) => {
  res.json("usgetUserProfileer...");
};

/**
 * @desc Update user info
 * @route PUT /api/users/update
 * @access Private
 */
export const updateUserProfile = (req, res, next) => {
  res.json("updateUserProfile...");
};
