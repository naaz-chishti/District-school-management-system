import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Exam from "../models/Exam.js";


// DASHBOARD REPORT
export const getDashboard =
  async (req, res) => {

    try {

      const totalStudents =
        await Student.countDocuments();

      const totalTeachers =
        await Teacher.countDocuments();

      const totalAttendance =
        await Attendance.countDocuments();

      const totalExams =
        await Exam.countDocuments();

      const totalFees =
        await Fee.aggregate([
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$paidAmount"
              }
            }
          }
        ]);

      res.status(200).json({
        success: true,
        dashboard: {
          totalStudents,
          totalTeachers,
          totalAttendance,
          totalExams,
          totalFees:
            totalFees[0]
              ?.total || 0
        }
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// STUDENT PERFORMANCE REPORT
export const studentPerformance =
  async (req, res) => {

    try {

      const report =
        await Exam.find()
          .populate(
            "studentId",
            "name studentId"
          )
          .populate(
            "schoolId",
            "schoolName"
          );

      res.status(200).json({
        success: true,
        report
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  export const feeReport =
  async (req, res) => {

    try {

      const fees =
        await Fee.find()
          .populate(
            "studentId",
            "name"
          )
          .populate(
            "schoolId",
            "schoolName"
          );

      res.status(200).json({
        success: true,
        fees
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };