import express from "express";

import {
  addLog,
  getLogs
} from "../controllers/auditController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/add",
  protect,
  addLog
);

router.get(
  "/all",
  protect,
  authorizeRoles(
    "district_admin"
  ),
  getLogs
);

export default router;