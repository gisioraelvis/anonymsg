import express from "express";
import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getUser,
} from "../controllers/user.controller.js";
import authenticate from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/").get(getUser);
router.route("/login").post(login);
router.route("/signup").post(register);
router.route("/dashboard").get(authenticate, getUserProfile);
router.route("/update").put(authenticate, updateUserProfile);

export default router;
