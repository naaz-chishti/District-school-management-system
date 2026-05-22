import express from "express";

import {
  parentDashboard,
  studentDashboard
} from "../controllers/portalController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Parent Dashboard
router.get(
  "/parent/:studentId",
  protect,
  authorizeRoles(
    "parent",
    "district_admin",
    "school_admin"
  ),
  parentDashboard
);

// Student Dashboard
router.get(
  "/student/:studentId",
  protect,
  authorizeRoles(
    "student",
    "district_admin",
    "school_admin"
  ),
  studentDashboard
);

export default router;