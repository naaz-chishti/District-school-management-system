import Event from "../models/Event.js";

// Add Event
export const addEvent =
  async (req, res) => {
    try {
      const event =
        await Event.create({
          ...req.body,
          createdBy:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Event added successfully",
        event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Get Events
export const getEvents =
  async (req, res) => {
    try {
      const events =
        await Event.find()
          .populate(
            "schoolId"
          )
          .populate(
            "createdBy",
            "name role"
          );

      res.status(200).json({
        success: true,
        events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };