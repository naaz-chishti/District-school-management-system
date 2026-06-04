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
        message:
          error.message
      });

    }
  };

// Get Timetable
export const getTimetable =
  async (req, res) => {

    try {

      const timetable =
        await Timetable.find()
          .populate(
            "schoolId"
          )
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
        message:
          error.message
      });

    }
  };

// Update Timetable
export const updateTimetable =
  async (req, res) => {

    try {

      const timetable =
        await Timetable.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Timetable updated successfully",
        timetable
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Delete Timetable
export const deleteTimetable =
  async (req, res) => {

    try {

      await Timetable.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Timetable deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };