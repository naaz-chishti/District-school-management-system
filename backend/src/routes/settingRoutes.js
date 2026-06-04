import express from "express";

import {
  saveSettings,
  getSettings,
  getSingleSetting,
  deleteSetting
} from "../controllers/settingController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


// Save Settings
router.post(
  "/save",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  saveSettings
);


// Get All Settings
router.get(
  "/all",
  protect,
  getSettings
);


// Get Single Setting
router.get(
  "/:id",
  protect,
  getSingleSetting
);


// Delete Setting
router.delete(
  "/delete/:id",
  protect,
  deleteSetting
);

export default router;