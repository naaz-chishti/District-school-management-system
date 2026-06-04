import express from "express";

import {
  applyLeave,
  getLeaves,
  updateLeave,
  deleteLeave,
  updateLeaveStatus
} from "../controllers/leaveController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Apply Leave
router.post(
  "/apply",
  protect,
  applyLeave
);

// Get Leaves
router.get(
  "/all",
  protect,
  getLeaves
);

// Update Leave
router.put(
  "/update/:id",
  protect,
  updateLeave
);

// Delete Leave
router.delete(
  "/delete/:id",
  protect,
  deleteLeave
);

// Approve / Reject
router.put(
  "/status",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateLeaveStatus
);

export default router;