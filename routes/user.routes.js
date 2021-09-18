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
router.route("/signup").post(register);
router.route("/dashboard").get(authenticate, getUserProfile);
router.route("/update").put(authenticate, updateUserProfile);

export default router;
