import express from "express";

import {
  createSchool,
  getSchools
} from "../controllers/schoolController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Only District Admin Can Create
router.post(
  "/create",
  protect,
  authorizeRoles("district_admin"),
  createSchool
);

// View Schools
router.get(
  "/all",
  protect,
  getSchools
);

export default router;