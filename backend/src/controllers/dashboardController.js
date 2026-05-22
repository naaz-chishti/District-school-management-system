import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import School from "../models/School.js";
import Attendance from "../models/Attendance.js";
import Exam from "../models/Exam.js";
import Fee from "../models/Fee.js";

export const getDashboard =
  async (req, res) => {
    try {
      const role =
        req.user.role;

      let dashboard = {};

      // District Admin
      if (
        role ===
        "district_admin"
      ) {
        dashboard = {
          totalSchools:
            await School.countDocuments(),
          totalTeachers:
            await Teacher.countDocuments(),
          totalStudents:
            await Student.countDocuments()
        };
      }

      // School Admin
      else if (
        role ===
        "school_admin"
      ) {
        dashboard = {
          totalTeachers:
            await Teacher.countDocuments(),
          totalStudents:
            await Student.countDocuments(),
          attendance:
            await Attendance.countDocuments()
        };
      }

      // Teacher
      else if (
        role ===
        "teacher"
      ) {
        dashboard = {
          attendance:
            await Attendance.countDocuments(),
          exams:
            await Exam.countDocuments()
        };
      }

      // Parent
      else if (
        role ===
        "parent"
      ) {
        dashboard = {
          fees:
            await Fee.countDocuments(),
          exams:
            await Exam.countDocuments()
        };
      }

      // Student
      else if (
        role ===
        "student"
      ) {
        dashboard = {
          attendance:
            await Attendance.countDocuments(),
          exams:
            await Exam.countDocuments()
        };
      }

      res.status(200).json({
        success: true,
        role,
        dashboard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };