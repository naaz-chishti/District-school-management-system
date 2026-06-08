import Exam from "../models/Exam.js";

// Add Exam
export const addExamResult =
  async (req, res) => {

    try {

      const existingExam =
        await Exam.findOne({
          studentId:
            req.body.studentId,
          subject:
            req.body.subject,
          examType:
            req.body.examType
        });

      if (existingExam) {
        return res.status(400).json({
          success: false,
          message:
            "Exam result already exists for this subject"
        });
      }

      const {
        obtainedMarks,
        totalMarks
      } = req.body;

      const percentage =
        (
          obtainedMarks /
          totalMarks
        ) * 100;

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
          "Exam Added Successfully",
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


// Get Exams
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


// Update Exam
export const updateExam =
  async (req, res) => {

    try {

      const existingExam =
        await Exam.findOne({
          studentId:
            req.body.studentId,
          subject:
            req.body.subject,
          examType:
            req.body.examType,
          _id: {
            $ne:
              req.params.id
          }
        });

      if (existingExam) {
        return res.status(400).json({
          success: false,
          message:
            "Exam result already exists for this subject"
        });
      }

      const {
        obtainedMarks,
        totalMarks
      } = req.body;

      const percentage =
        (
          obtainedMarks /
          totalMarks
        ) * 100;

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
        await Exam.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            percentage:
              percentage.toFixed(
                2
              ),
            grade,
            resultStatus
          },
          {
            new: true,
            runValidators:
              true
          }
        );

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Exam Updated Successfully",
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


// Delete Exam
export const deleteExam =
  async (req, res) => {

    try {

      await Exam.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Exam Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };