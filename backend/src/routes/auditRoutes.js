import express from "express";

import {
  addLog,
  getLogs,
  updateLog,
  deleteLog
} from "../controllers/auditController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Audit Log
router.post(
  "/add",
  protect,
  addLog
);

// Get All Logs
router.get(
  "/all",
  protect,
  authorizeRoles("district_admin"),
  getLogs
);

// Update Log
router.put(
  "/update/:id",
  protect,
  authorizeRoles("district_admin"),
  updateLog
);

// Delete Log
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("district_admin"),
  deleteLog
);

export default router;