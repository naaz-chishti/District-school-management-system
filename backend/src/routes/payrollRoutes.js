import express from "express";

import {
  addPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll
} from "../controllers/payrollController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

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

// Update Payroll
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updatePayroll
);

// Delete Payroll
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deletePayroll
);

export default router;