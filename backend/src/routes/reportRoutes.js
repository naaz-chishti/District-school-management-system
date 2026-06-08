import express from "express";

import {
  getDashboard,
  studentPerformance,
  feeReport
} from "../controllers/reportController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// Dashboard Report
router.get(
  "/dashboard",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  getDashboard
);


// Student Performance Report
router.get(
  "/student-performance",
  protect,
  studentPerformance
);


// Fee Report
router.get(
  "/fees",
  protect,
  feeReport
);


export default router;