import Payroll from "../models/Payroll.js";

// Add Payroll
export const addPayroll =
  async (req, res) => {
    try {
      const {
        basicSalary,
        allowances,
        deductions
      } = req.body;

      const netSalary =
        basicSalary +
        allowances -
        deductions;

      const payroll =
        await Payroll.create({
          ...req.body,
          netSalary
        });

      res.status(201).json({
        success: true,
        message:
          "Payroll added successfully",
        payroll
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Get Payrolls
export const getPayrolls =
  async (req, res) => {
    try {
      const payrolls =
        await Payroll.find()
          .populate(
            "teacherId"
          )
          .populate(
            "schoolId"
          );

      res.status(200).json({
        success: true,
        payrolls
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };