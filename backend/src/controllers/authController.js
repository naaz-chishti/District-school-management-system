import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const login =
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      console.log(
        "EMAIL:",
        email
      );

      console.log(
        "PASSWORD:",
        password
      );

      const user =
        await User.findOne({
          email
        });

      console.log(
        "USER:",
        user
      );

      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid credentials"
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      console.log(
        "MATCH:",
        isMatch
      );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid credentials"
          });
      }

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
        token,
        user
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };