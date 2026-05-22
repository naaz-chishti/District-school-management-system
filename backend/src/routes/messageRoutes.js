import express from "express";

import {
  sendMessage,
  getInbox
} from "../controllers/messageController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Send Message
router.post(
  "/send",
  protect,
  sendMessage
);

// Inbox
router.get(
  "/inbox",
  protect,
  getInbox
);

export default router;