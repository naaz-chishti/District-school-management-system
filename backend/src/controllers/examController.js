import Exam from "../models/Exam.js";

// Add Exam Result
export const addExamResult =
  async (req, res) => {
    try {
      const {
        obtainedMarks,
        totalMarks
      } = req.body;

      // Calculate Percentage
      const percentage =
        (
          obtainedMarks /
          totalMarks
        ) * 100;

      // Grade Logic
      let grade = "";
      let resultStatus =
        "pass";

      if (percentage >= 90) {
        grade = "A+";
      } else if (
        percentage >= 80
      ) {
        grade = "A";
      } else if (
        percentage >= 70
      ) {
        grade = "B";
      } else if (
        percentage >= 60
      ) {
        grade = "C";
      } else if (
        percentage >= 35
      ) {
        grade = "D";
      } else {
        grade = "F";
        resultStatus =
          "fail";
      }

      const exam =
        await Exam.create({
          ...req.body,
          percentage:
            percentage.toFixed(
              2
            ),
          grade,
          resultStatus
        });

      res.status(201).json({
        success: true,
        message:
          "Exam result added successfully",
        exam
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Get All Results
export const getExamResults =
  async (req, res) => {
    try {
      const exams =
        await Exam.find()
          .populate(
            "studentId"
          )
          .populate(
            "schoolId"
          );

      res.status(200).json({
        success: true,
        exams
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Student Report Card
export const getStudentReportCard =
  async (req, res) => {
    try {
      const { studentId } =
        req.params;

      const reportCard =
        await Exam.find({
          studentId
        })
          .populate(
            "studentId"
          )
          .populate(
            "schoolId"
          );

      res.status(200).json({
        success: true,
        reportCard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };