import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const register =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
        phone
      } = req.body;

      // Validation
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

      // Check existing email
      const userExists =
        await User.findOne({
          email
        });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message:
            "Email already exists"
        });
      }

      // Hash password
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // Create user
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
          phone
        });

      res.status(201).json({
        success: true,
        message:
          "User Registered Successfully",
        user
      });

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// LOGIN
export const login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // Validation
      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email and Password are required"
        });
      }

      // Find user
      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid Email or Password"
        });
      }

      // Compare password
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid Email or Password"
        });
      }

      // Generate token
      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Login Successful",
        token,
        user
      });

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  // CHANGE PASSWORD
export const changePassword =
  async (req, res) => {

    try {

      const {
        oldPassword,
        newPassword
      } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found"
        });
      }

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Current password is incorrect"
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password changed successfully"
      });

    } catch (error) {

      console.log(
        "CHANGE PASSWORD ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  // RESET PASSWORD
export const resetPassword =
  async (req, res) => {

    try {

      const {
        email,
        newPassword
      } = req.body;

      if (
        !email ||
        !newPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email and New Password are required"
        });
      }

      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found"
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password Reset Successfully"
      });

    } catch (error) {

      console.log(
        "RESET PASSWORD ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };