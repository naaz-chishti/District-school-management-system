import express from "express";

import {
  addHostel,
  getHostels
} from "../controllers/hostelController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Hostel
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addHostel
);

// Get Hostel
router.get(
  "/all",
  protect,
  getHostels
);

export default router;