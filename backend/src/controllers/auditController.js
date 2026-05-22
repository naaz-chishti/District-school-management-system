import AuditLog from "../models/AuditLog.js";

// Add Log
export const addLog =
  async (req, res) => {
    try {
      const log =
        await AuditLog.create({
          userId:
            req.user._id,
          ...req.body
        });

      res.status(201).json({
        success: true,
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

// Get Logs
export const getLogs =
  async (req, res) => {
    try {
      const logs =
        await AuditLog.find()
          .populate(
            "userId",
            "name role"
          );

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