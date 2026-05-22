import express from "express";

import {
  addEvent,
  getEvents
} from "../controllers/eventController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Event
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addEvent
);

// Get Events
router.get(
  "/all",
  protect,
  getEvents
);

export default router;