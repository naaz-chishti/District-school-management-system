import Attendance from "../models/Attendance.js";

// Mark Attendance
// Mark Attendance
export const markAttendance =
  async (req, res) => {

    try {

      const existingAttendance =
        await Attendance.findOne({
          studentId:
            req.body.studentId,
          date:
            req.body.date
        });

      if (existingAttendance) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance already marked for this student"
        });
      }

      const attendance =
        await Attendance.create({
          ...req.body,
          markedBy:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Attendance Marked Successfully",
        attendance
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Get Attendance
export const getAttendance =
  async (req, res) => {
    try {

      const attendance =
        await Attendance.find()
          .populate(
            "studentId"
          )
          .populate(
            "schoolId"
          );

      res.status(200).json({
        success: true,
        attendance
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Update Attendance
// Update Attendance
export const updateAttendance =
  async (req, res) => {

    try {

      const existingAttendance =
        await Attendance.findOne({
          studentId:
            req.body.studentId,
          date:
            req.body.date,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingAttendance) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance already marked for this student"
        });
      }

      const attendance =
        await Attendance.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message:
            "Attendance not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Attendance Updated Successfully",
        attendance
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Delete Attendance
export const deleteAttendance =
  async (req, res) => {
    try {

      await Attendance.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Attendance deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };