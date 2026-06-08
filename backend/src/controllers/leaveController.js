import Leave from "../models/Leave.js";

// Apply Leave
export const applyLeave =
  async (req, res) => {

    try {

      const existingLeave =
        await Leave.findOne({
          userId: req.user._id,
          startDate:
            req.body.startDate,
          endDate:
            req.body.endDate
        });

      if (existingLeave) {
        return res.status(400).json({
          success: false,
          message:
            "Leave already applied for these dates"
        });
      }

      const leave =
        await Leave.create({
          ...req.body,
          userId:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Leave Applied Successfully",
        leave
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Get Leaves
export const getLeaves =
  async (req, res) => {
    try {

      const leaves =
        await Leave.find()
          .populate(
            "userId",
            "name role email"
          );

      res.status(200).json({
        success: true,
        leaves
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Update Leave
// Update Leave
export const updateLeave =
  async (req, res) => {

    try {

      const existingLeave =
        await Leave.findOne({
          userId:
            req.body.userId,
          startDate:
            req.body.startDate,
          endDate:
            req.body.endDate,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingLeave) {
        return res.status(400).json({
          success: false,
          message:
            "Leave already applied for these dates"
        });
      }

      const leave =
        await Leave.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!leave) {
        return res.status(404).json({
          success: false,
          message:
            "Leave not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Leave Updated Successfully",
        leave
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Delete Leave
export const deleteLeave =
  async (req, res) => {
    try {

      await Leave.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Leave deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

// Approve / Reject Leave
// Approve / Reject Leave
export const updateLeaveStatus =
  async (req, res) => {

    try {

      const {
        leaveId,
        status
      } = req.body;

      const leave =
        await Leave.findById(
          leaveId
        );

      if (!leave) {
        return res.status(404).json({
          success: false,
          message:
            "Leave not found"
        });
      }

      leave.status =
        status;

      await leave.save();

      res.status(200).json({
        success: true,
        message:
          `Leave ${status} Successfully`,
        leave
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };