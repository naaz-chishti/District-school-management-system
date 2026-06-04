import express from "express";

import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/create",
  protect,
  createUser
);

router.get(
  "/all",
  protect,
  getUsers
);

router.get(
  "/:id",
  protect,
  getSingleUser
);

router.put(
  "/update/:id",
  protect,
  updateUser
);

router.put(
  "/profile/:id",
  protect,
  updateUser
);


router.delete(
  "/delete/:id",
  protect,
  deleteUser
);

export default router;