import express from "express";

import {
  addExamResult,
  getExamResults,
  updateExam,
  deleteExam
} from "../controllers/examController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Add Exam
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  addExamResult
);

// Get Exams
router.get(
  "/all",
  protect,
  getExamResults
);

// Update Exam
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  updateExam
);

// Delete Exam
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteExam
);

export default router;