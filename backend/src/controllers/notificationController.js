import Notification from "../models/Notification.js";


// Add Notification
export const addNotification =
  async (req, res) => {

    try {

      const existingNotification =
        await Notification.findOne({
          title:
            req.body.title,
          schoolId:
            req.body.schoolId,
          sentTo:
            req.body.sentTo
        });

      if (existingNotification) {
        return res.status(400).json({
          success: false,
          message:
            "Notification already exists"
        });
      }

      const notification =
        await Notification.create({
          ...req.body,
          createdBy:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Notification Sent Successfully",
        notification
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get All Notifications
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
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json({
        success: true,
        notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get Single Notification
export const getSingleNotification =
  async (req, res) => {

    try {

      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      res.status(200).json({
        success: true,
        notification
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Update Notification
export const updateNotification =
  async (req, res) => {

    try {

      const existingNotification =
        await Notification.findOne({
          title:
            req.body.title,
          schoolId:
            req.body.schoolId,
          sentTo:
            req.body.sentTo,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingNotification) {
        return res.status(400).json({
          success: false,
          message:
            "Notification already exists"
        });
      }

      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Notification Updated Successfully",
        notification
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete Notification
export const deleteNotification =
  async (req, res) => {

    try {

      const notification =
        await Notification.findByIdAndDelete(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Notification Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get Latest Notifications
export const getLatestNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find()
          .sort({
            createdAt: -1
          })
          .limit(5);

      res.status(200).json({
        success: true,
        notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };