import Attendance from "../models/Attendance.js";

// Mark Attendance
export const markAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.create({
          ...req.body,
          markedBy: req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Attendance marked successfully",
        attendance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

// Get Attendance
export const getAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find()
          .populate("studentId")
          .populate("schoolId")
          .populate(
            "markedBy",
            "name role"
          );

      res.status(200).json({
        success: true,
        attendance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };