import express from "express";

import {
  addTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable
} from "../controllers/timetableController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Add
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addTimetable
);

// Get All
router.get(
  "/all",
  protect,
  getTimetable
);

// Update
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateTimetable
);

// Delete
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteTimetable
);

export default router;