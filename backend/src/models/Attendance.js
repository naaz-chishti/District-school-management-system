import mongoose from "mongoose";

const attendanceSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      },

      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      },

      status: {
        type: String,
        enum: [
          "present",
          "absent",
          "late"
        ],
        required: true
      },

      remarks: {
        type: String,
        default: ""
      },

      markedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    },
    {
      timestamps: true
    }
  );

const Attendance =
  mongoose.model(
    "Attendance",
    attendanceSchema
  );

export default Attendance;