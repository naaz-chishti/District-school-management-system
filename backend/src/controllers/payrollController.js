import Payroll from "../models/Payroll.js";


// Add Payroll
export const addPayroll =
  async (req, res) => {

    try {

      const existingPayroll =
        await Payroll.findOne({
          teacherId:
            req.body.teacherId,
          month:
            req.body.month,
          year:
            req.body.year
        });

      if (existingPayroll) {
        return res.status(400).json({
          success: false,
          message:
            "Payroll already exists for this teacher and month"
        });
      }

      const {
        basicSalary,
        allowances,
        deductions
      } = req.body;

      const netSalary =
        Number(basicSalary) +
        Number(allowances || 0) -
        Number(deductions || 0);

      const payroll =
        await Payroll.create({
          ...req.body,
          netSalary
        });

      res.status(201).json({
        success: true,
        message:
          "Payroll Added Successfully",
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


// Update Payroll
export const updatePayroll =
  async (req, res) => {

    try {

      const existingPayroll =
        await Payroll.findOne({
          teacherId:
            req.body.teacherId,
          month:
            req.body.month,
          year:
            req.body.year,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingPayroll) {
        return res.status(400).json({
          success: false,
          message:
            "Payroll already exists for this teacher and month"
        });
      }

      const {
        basicSalary,
        allowances,
        deductions
      } = req.body;

      const netSalary =
        Number(basicSalary) +
        Number(allowances || 0) -
        Number(deductions || 0);

      const payroll =
        await Payroll.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            netSalary
          },
          {
            new: true,
            runValidators: true
          }
        );

      if (!payroll) {
        return res.status(404).json({
          success: false,
          message:
            "Payroll not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Payroll Updated Successfully",
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


// Delete Payroll
export const deletePayroll =
  async (req, res) => {

    try {

      const payroll =
        await Payroll.findByIdAndDelete(
          req.params.id
        );

      if (!payroll) {
        return res.status(404).json({
          success: false,
          message:
            "Payroll not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Payroll Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };