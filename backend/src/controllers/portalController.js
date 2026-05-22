import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Exam from "../models/Exam.js";
import Timetable from "../models/Timetable.js";
import Notification from "../models/Notification.js";
import Student from "../models/Student.js";

// Parent Portal Dashboard
export const parentDashboard =
  async (req, res) => {
    try {
      const { studentId } =
        req.params;

      const attendance =
        await Attendance.find({
          studentId
        });

      const fees =
        await Fee.find({
          studentId
        });

      const exams =
        await Exam.find({
          studentId
        });

      const student =
        await Student.findById(
          studentId
        );

      const timetable =
        await Timetable.find({
          className:
            student.className,
          section:
            student.section
        });

      const notifications =
        await Notification.find({
          schoolId:
            student.schoolId
        });

      res.status(200).json({
        success: true,
        attendance,
        fees,
        exams,
        timetable,
        notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Student Dashboard
export const studentDashboard =
  async (req, res) => {
    try {
      const { studentId } =
        req.params;

      const attendance =
        await Attendance.find({
          studentId
        });

      const exams =
        await Exam.find({
          studentId
        });

      const student =
        await Student.findById(
          studentId
        );

      const timetable =
        await Timetable.find({
          className:
            student.className,
          section:
            student.section
        });

      const notifications =
        await Notification.find({
          schoolId:
            student.schoolId
        });

      res.status(200).json({
        success: true,
        attendance,
        exams,
        timetable,
        notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };