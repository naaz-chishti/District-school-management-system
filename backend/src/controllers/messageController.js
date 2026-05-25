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

// Inbox
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