import Leave from "../models/Leave.js";

// Apply Leave
export const applyLeave =
  async (req, res) => {
    try {

      const leave =
        await Leave.create({
          ...req.body,
          userId:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Leave applied successfully",
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
export const updateLeave =
  async (req, res) => {
    try {

      const leave =
        await Leave.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json({
        success: true,
        message:
          "Leave updated successfully",
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
export const updateLeaveStatus =
  async (req, res) => {
    try {

      const {
        leaveId,
        status
      } = req.body;

      const leave =
        await Leave.findByIdAndUpdate(
          leaveId,
          { status },
          { new: true }
        );

      res.status(200).json({
        success: true,
        message:
          `Leave ${status}`,
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