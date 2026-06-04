import Message from "../models/Message.js";


// Send Message
export const sendMessage =
  async (req, res) => {
    try {

      const message =
        await Message.create({
          ...req.body,
          senderId:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Message sent successfully",
        data: message
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Inbox / Message List
export const getInbox =
  async (req, res) => {
    try {

      const inbox =
        await Message.find()
          .populate(
            "senderId",
            "name email role"
          )
          .populate(
            "receiverId",
            "name email role"
          )
          .sort({
            createdAt: -1
          });

      res.status(200).json({
        success: true,
        inbox
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get Single Message
export const getSingleMessage =
  async (req, res) => {
    try {

      const message =
        await Message.findById(
          req.params.id
        )
          .populate(
            "senderId"
          )
          .populate(
            "receiverId"
          );

      if (!message) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Message not found"
          });
      }

      res.status(200).json({
        success: true,
        message
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Update Message
export const updateMessage =
  async (req, res) => {
    try {

      const updatedMessage =
        await Message.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json({
        success: true,
        message:
          "Message Updated Successfully",
        data:
          updatedMessage
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete Message
export const deleteMessage =
  async (req, res) => {
    try {

      await Message.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Message Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };