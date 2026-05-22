import mongoose from "mongoose";

const payrollSchema =
  new mongoose.Schema(
    {
      teacherId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
      },

      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
      },

      basicSalary: {
        type: Number,
        required: true
      },

      allowances: {
        type: Number,
        default: 0
      },

      deductions: {
        type: Number,
        default: 0
      },

      netSalary: {
        type: Number,
        default: 0
      },

      month: {
        type: String,
        required: true
      },

      year: {
        type: Number,
        required: true
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid"
        ],
        default: "pending"
      },

      performanceRating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
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

const Payroll =
  mongoose.model(
    "Payroll",
    payrollSchema
  );

export default Payroll;