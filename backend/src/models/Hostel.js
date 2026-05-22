import mongoose from "mongoose";

const hostelSchema =
  new mongoose.Schema(
    {
      hostelName: {
        type: String,
        required: true
      },

      roomNumber: {
        type: String,
        required: true
      },

      roomType: {
        type: String,
        enum: [
          "single",
          "double",
          "shared"
        ],
        required: true
      },

      capacity: {
        type: Number,
        default: 4
      },

      occupiedBeds: {
        type: Number,
        default: 0
      },

      assignedStudents: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
      ],

      wardenName: {
        type: String,
        required: true
      },

      wardenPhone: {
        type: String,
        required: true
      },

      messAvailable: {
        type: Boolean,
        default: true
      },

      messMenu: [
        {
          day: String,
          breakfast: String,
          lunch: String,
          dinner: String
        }
      ],

      hostelFee: {
        type: Number,
        default: 0
      },

      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
      },

      status: {
        type: String,
        enum: [
          "available",
          "full"
        ],
        default: "available"
      }
    },
    {
      timestamps: true
    }
  );

const Hostel = mongoose.model(
  "Hostel",
  hostelSchema
);

export default Hostel;