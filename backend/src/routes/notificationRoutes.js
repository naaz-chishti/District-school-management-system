import express from "express";

import {
  addNotification,
  getNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
  getLatestNotifications
} from "../controllers/notificationController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


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


// Latest Notifications (Bell Icon)

router.get(
  "/latest",
  protect,
  getLatestNotifications
);


// Get All Notifications

router.get(
  "/all",
  protect,
  getNotifications
);


// Get Single Notification

router.get(
  "/:id",
  protect,
  getSingleNotification
);


// Update Notification

router.put(
  "/update/:id",
  protect,
  updateNotification
);


// Delete Notification

router.delete(
  "/delete/:id",
  protect,
  deleteNotification
);

export default router;