import mongoose from "mongoose";
import User from "../models/User.js";


// CREATE USER
export const createUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
      schoolId,
      phone
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields"
      });
    }

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
        schoolId:
          schoolId &&
          mongoose.Types.ObjectId.isValid(
            schoolId
          )
            ? schoolId
            : null,
        phone
      });

    res.status(201).json({
      success: true,
      message:
        "User Created Successfully",
      user
    });

  } catch (error) {

    console.log(
      "CREATE USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};


// GET USERS
export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .populate(
            "schoolId",
            "schoolName"
          );

      res.status(200).json({
        success: true,
        users
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// GET SINGLE USER
export const getSingleUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        ).populate(
          "schoolId",
          "schoolName"
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found"
        });
      }

      res.status(200).json({
        success: true,
        user
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// UPDATE USER
export const updateUser = async (req, res) => {

  try {

    const updateData = {
      ...req.body
    };

    const existingUser =
      await User.findOne({
        email:
          updateData.email,
        _id: {
          $ne:
            req.params.id
        }
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists"
      });
    }

    if (
      !updateData.password ||
      updateData.password.trim() === ""
    ) {
      delete updateData.password;
    } else {

      updateData.password =
        await bcrypt.hash(
          updateData.password,
          10
        );
    }

    if (
      updateData.schoolId &&
      !mongoose.Types.ObjectId.isValid(
        updateData.schoolId
      )
    ) {
      updateData.schoolId =
        null;
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User Updated Successfully",
      user
    });

  } catch (error) {

    console.log(
      "UPDATE USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};


// DELETE USER
export const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "User Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };