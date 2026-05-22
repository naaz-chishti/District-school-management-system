import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
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

    totalFee: {
      type: Number,
      required: true
    },

    paidAmount: {
      type: Number,
      default: 0
    },

    remainingAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: [
        "paid",
        "partial",
        "pending"
      ],
      default: "pending"
    },

    paymentDate: {
      type: Date
    },

    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "online",
        "upi",
        "bank_transfer"
      ]
    }
  },
  {
    timestamps: true
  }
);

const Fee = mongoose.model(
  "Fee",
  feeSchema
);

export default Fee;