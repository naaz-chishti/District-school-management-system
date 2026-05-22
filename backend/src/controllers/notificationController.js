import Notification from "../models/Notification.js";

// Send Notification
export const addNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create({
          ...req.body,
          createdBy:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Notification sent successfully",
        notification
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

// Get Notifications
export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find()
          .populate(
            "schoolId"
          )
          .populate(
            "createdBy",
            "name role"
          );

      res.status(200).json({
        success: true,
        notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };