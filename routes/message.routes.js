import express from "express";
import { messageController } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(messageController);

export default router;
