import express from "express";

import {
  addHostel,
  getHostels,
  updateHostel,
  deleteHostel
} from "../controllers/hostelController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

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

// Get Hostels
router.get(
  "/all",
  protect,
  getHostels
);

// Update Hostel
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateHostel
);

// Delete Hostel
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteHostel
);

export default router;