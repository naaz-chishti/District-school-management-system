import AuditLog from "../models/AuditLog.js";


// Add Log
export const addLog =
  async (req, res) => {

    try {

      const {
        action,
        module,
        details
      } = req.body;

      if (
        !action ||
        !module
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Action and Module are required"
        });
      }

      const log =
        await AuditLog.create({
          userId:
            req.user._id,
          action,
          module,
          details
        });

      res.status(201).json({
        success: true,
        message:
          "Audit Log Added Successfully",
        log
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get All Logs
export const getLogs =
  async (req, res) => {

    try {

      const logs =
        await AuditLog.find()
          .populate(
            "userId",
            "name role"
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json({
        success: true,
        logs
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Update Log
export const updateLog =
  async (req, res) => {

    try {

      const log =
        await AuditLog.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!log) {
        return res.status(404).json({
          success: false,
          message:
            "Audit Log not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Audit Log Updated Successfully",
        log
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete Log
export const deleteLog =
  async (req, res) => {

    try {

      const log =
        await AuditLog.findByIdAndDelete(
          req.params.id
        );

      if (!log) {
        return res.status(404).json({
          success: false,
          message:
            "Audit Log not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Audit Log Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };