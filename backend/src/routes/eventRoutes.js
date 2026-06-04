import express from "express";

import {
  addEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

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

// Update Event
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateEvent
);

// Delete Event
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteEvent
);

export default router;