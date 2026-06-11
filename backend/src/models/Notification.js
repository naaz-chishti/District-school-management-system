import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },

      message: {
        type: String,
        required: true
      },

      sentTo: {
        type: String,
        enum: [
          "all",
          "students",
          "teachers",
          "parents",
          "selected_students"
        ],
        default: "all"
      },

      priority: {
        type: String,
        enum: [
          "normal",
          "important",
          "urgent"
        ],
        default: "normal"
      },

      studentIds: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
      ],

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
      }
    },
    {
      timestamps: true
    }
  );

const Notification =
  mongoose.model(
    "Notifications",
    notificationSchema
  );

export default Notification;