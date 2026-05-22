import Timetable from "../models/Timetable.js";

// Add Timetable
export const addTimetable =
  async (req, res) => {
    try {
      const timetable =
        await Timetable.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Timetable added successfully",
        timetable
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

// Get Timetable
export const getTimetable =
  async (req, res) => {
    try {
      const timetable =
        await Timetable.find()
          .populate("schoolId")
          .populate(
            "teacherId"
          );

      res.status(200).json({
        success: true,
        timetable
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };