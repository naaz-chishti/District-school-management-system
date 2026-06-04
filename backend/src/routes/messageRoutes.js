import express from "express";

import {
  sendMessage,
  getInbox,
  getSingleMessage,
  updateMessage,
  deleteMessage
} from "../controllers/messageController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Send Message
router.post(
  "/send",
  protect,
  sendMessage
);

// Inbox / List
router.get(
  "/inbox",
  protect,
  getInbox
);

// Single Message
router.get(
  "/:id",
  protect,
  getSingleMessage
);

// Update Message
router.put(
  "/update/:id",
  protect,
  updateMessage
);

// Delete Message
router.delete(
  "/delete/:id",
  protect,
  deleteMessage
);

export default router;