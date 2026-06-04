import express from "express";

import {
  addTransport,
  getTransport,
  updateTransport,
  deleteTransport
} from "../controllers/transportController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

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

// Update Transport
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateTransport
);

// Delete Transport
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteTransport
);

export default router;