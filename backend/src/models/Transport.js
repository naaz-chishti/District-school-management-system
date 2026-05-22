import mongoose from "mongoose";

const transportSchema =
  new mongoose.Schema(
    {
      busNumber: {
        type: String,
        required: true,
        unique: true
      },

      vehicleNumber: {
        type: String,
        required: true
      },

      driverName: {
        type: String,
        required: true
      },

      driverPhone: {
        type: String,
        required: true
      },

      routeName: {
        type: String,
        required: true
      },

      pickupPoints: [
        {
          type: String
        }
      ],

      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
      },

      assignedStudents: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
      ],

      boardingStatus: {
        type: String,
        enum: [
          "not_boarded",
          "boarded",
          "dropped"
        ],
        default:
          "not_boarded"
      },

      parentAlertSent: {
        type: Boolean,
        default: false
      },

      capacity: {
        type: Number,
        default: 50
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive"
        ],
        default: "active"
      }
    },
    {
      timestamps: true
    }
  );

const Transport =
  mongoose.model(
    "Transport",
    transportSchema
  );

export default Transport;