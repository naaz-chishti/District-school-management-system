import Timetable from "../models/Timetable.js";


// Add Timetable
export const addTimetable =
  async (req, res) => {

    try {

      const existingTimetable =
        await Timetable.findOne({
          schoolId:
            req.body.schoolId,
          className:
            req.body.className,
          section:
            req.body.section,
          day:
            req.body.day,
          startTime:
            req.body.startTime
        });

      if (existingTimetable) {
        return res.status(400).json({
          success: false,
          message:
            "Timetable already exists for this class and time"
        });
      }

      const timetable =
        await Timetable.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Timetable Added Successfully",
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

      const existingTimetable =
        await Timetable.findOne({
          schoolId:
            req.body.schoolId,
          className:
            req.body.className,
          section:
            req.body.section,
          day:
            req.body.day,
          startTime:
            req.body.startTime,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingTimetable) {
        return res.status(400).json({
          success: false,
          message:
            "Timetable already exists for this class and time"
        });
      }

      const timetable =
        await Timetable.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!timetable) {
        return res.status(404).json({
          success: false,
          message:
            "Timetable not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Timetable Updated Successfully",
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

      const timetable =
        await Timetable.findByIdAndDelete(
          req.params.id
        );

      if (!timetable) {
        return res.status(404).json({
          success: false,
          message:
            "Timetable not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Timetable Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };