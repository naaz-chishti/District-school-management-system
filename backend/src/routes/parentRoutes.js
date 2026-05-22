import express from "express";

import {
  addParent,
  getParents
} from "../controllers/parentController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Parent
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addParent
);

// Get Parents
router.get(
  "/all",
  protect,
  getParents
);

export default router;