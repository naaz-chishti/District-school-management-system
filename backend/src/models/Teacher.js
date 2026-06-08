import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    subject: {
      type: String,
      required: true
    },

    qualification: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      default: 0
    },

    attendance: {
      type: Number,
      default: 0
    },

    leaveBalance: {
      type: Number,
      default: 12
    },

    performanceScore: {
      type: Number,
      default: 0
    },

    feedback: {
      type: String,
      default: ""
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Teacher = mongoose.model(
  "Teacher",
  teacherSchema
);

export default Teacher;