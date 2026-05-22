import express from "express";

import {
  addPayroll,
  getPayrolls
} from "../controllers/payrollController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Payroll
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addPayroll
);

// Get Payrolls
router.get(
  "/all",
  protect,
  getPayrolls
);

export default router;