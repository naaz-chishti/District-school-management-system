import express from "express";

import {
  createSchool,
  getSchools,
  getSingleSchool,
  updateSchool,
  deleteSchool
} from "../controllers/schoolController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// Create School
router.post(
  "/create",
  protect,
  authorizeRoles(
    "district_admin"
  ),
  createSchool
);


// Get All Schools
router.get(
  "/all",
  protect,
  getSchools
);


// Get Single School
router.get(
  "/:id",
  protect,
  getSingleSchool
);


// Update School
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin"
  ),
  updateSchool
);


// Delete School
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin"
  ),
  deleteSchool
);

export default router;