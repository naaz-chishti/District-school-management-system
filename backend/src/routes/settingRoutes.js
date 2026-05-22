import express from "express";

import {
  saveSettings,
  getSettings
} from "../controllers/settingController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/save",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  saveSettings
);

router.get(
  "/all",
  protect,
  getSettings
);

export default router;