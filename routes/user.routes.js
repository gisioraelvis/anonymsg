import express from "express";
import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import authenticate from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/login").get(login);
router.route("/signup").get(register);
router.route("/dashboard").get(authenticate, getUserProfile);
router.route("/update").get(authenticate, updateUserProfile);

export default router;
