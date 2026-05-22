import mongoose from "mongoose";

const timetableSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
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

      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        required: true
      },

      subject: {
        type: String,
        required: true
      },

      teacherId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
      },

      startTime: {
        type: String,
        required: true
      },

      endTime: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

const Timetable =
  mongoose.model(
    "Timetable",
    timetableSchema
  );

export default Timetable;