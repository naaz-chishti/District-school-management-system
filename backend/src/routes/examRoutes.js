import express from "express";

import {
  addExamResult,
  getExamResults,
  getStudentReportCard
} from "../controllers/examController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Exam Result
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

// Get All Results
router.get(
  "/all",
  protect,
  getExamResults
);

// Student Report Card
router.get(
  "/report-card/:studentId",
  protect,
  getStudentReportCard
);

export default router;