import express from "express";

import {
  getDashboard,
  studentPerformance
} from "../controllers/reportController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  getDashboard
);

// Student Report
router.get(
  "/student-performance",
  protect,
  studentPerformance
);

export default router;