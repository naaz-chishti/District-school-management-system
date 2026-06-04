import express from "express";

import {
  addFee,
  getFees,
  updateFee,
  deleteFee
} from "../controllers/feeController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addFee
);

router.get(
  "/all",
  protect,
  getFees
);

// Update Fee
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateFee
);

// Delete Fee
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteFee
);

export default router;