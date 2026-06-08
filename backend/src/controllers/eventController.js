import Event from "../models/Event.js";

// Add Event
export const addEvent =
  async (req, res) => {

    try {

      const existingEvent =
        await Event.findOne({
          title: req.body.title,
          startDate: req.body.startDate,
          schoolId: req.body.schoolId
        });

      if (existingEvent) {
        return res.status(400).json({
          success: false,
          message:
            "Event already exists"
        });
      }

      const event =
        await Event.create({
          ...req.body,
          createdBy:
            req.user._id
        });

      res.status(201).json({
        success: true,
        message:
          "Event Added Successfully",
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

// Update Event
export const updateEvent =
  async (req, res) => {

    try {

      const existingEvent =
        await Event.findOne({
          title: req.body.title,
          startDate: req.body.startDate,
          schoolId: req.body.schoolId,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingEvent) {
        return res.status(400).json({
          success: false,
          message:
            "Event already exists"
        });
      }

      const event =
        await Event.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!event) {
        return res.status(404).json({
          success: false,
          message:
            "Event not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Event Updated Successfully",
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

// Delete Event
export const deleteEvent =
  async (req, res) => {
    try {

      await Event.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Event deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };