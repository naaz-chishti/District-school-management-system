import express from "express";

import {
  addParent,
  getParents,
  updateParent,
  deleteParent
} from "../controllers/parentController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

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

// Update Parent
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateParent
);

// Delete Parent
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteParent
);

export default router;