import express from "express";

import {
  addNotification,
  getNotifications
} from "../controllers/notificationController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Send Notification
router.post(
  "/send",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  addNotification
);

// View Notifications
router.get(
  "/all",
  protect,
  getNotifications
);

export default router;