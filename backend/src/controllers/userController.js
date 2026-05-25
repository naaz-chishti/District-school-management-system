import User from "../models/User.js";

// Get All Users
export const getUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .populate(
            "schoolId"
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