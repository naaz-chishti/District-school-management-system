import express from "express";

import {
  addTransport,
  getTransport,
  assignStudentToBus,
  updateBoardingStatus
} from "../controllers/transportController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Transport
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addTransport
);

// Get All Transport
router.get(
  "/all",
  protect,
  getTransport
);

// Assign Student To Bus
router.post(
  "/assign-student",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  assignStudentToBus
);

// Boarding / Drop Status
router.put(
  "/boarding-status",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  updateBoardingStatus
);

export default router;