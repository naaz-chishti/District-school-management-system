import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    className: {
      type: String,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    examType: {
      type: String,
      enum: [
        "unit_test",
        "mid_term",
        "final_exam"
      ],
      required: true
    },

    examDate: {
      type: Date,
      required: true
    },

    totalMarks: {
      type: Number,
      required: true
    },

    obtainedMarks: {
      type: Number,
      required: true
    },

    percentage: {
      type: Number,
      default: 0
    },

    grade: {
      type: String,
      default: ""
    },

    resultStatus: {
      type: String,
      enum: ["pass", "fail"],
      default: "pass"
    },

    remarks: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Exam = mongoose.model(
  "Exam",
  examSchema
);

export default Exam;