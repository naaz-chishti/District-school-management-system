import express from "express";

import {
  addFee,
  getFees
} from "../controllers/feeController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Fee
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addFee
);

// Get Fees
router.get(
  "/all",
  protect,
  getFees
);

export default router;