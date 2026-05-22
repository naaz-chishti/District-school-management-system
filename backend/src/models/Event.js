import mongoose from "mongoose";

const eventSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      eventType: {
        type: String,
        enum: [
          "holiday",
          "event",
          "exam",
          "meeting"
        ],
        required: true
      },

      startDate: {
        type: Date,
        required: true
      },

      endDate: {
        type: Date,
        required: true
      },

      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      status: {
        type: String,
        enum: [
          "upcoming",
          "completed",
          "cancelled"
        ],
        default:
          "upcoming"
      }
    },
    {
      timestamps: true
    }
  );

const Event = mongoose.model(
  "Event",
  eventSchema
);

export default Event;