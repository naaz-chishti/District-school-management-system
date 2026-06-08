import Transport from "../models/Transport.js";


// Add Transport
export const addTransport =
  async (req, res) => {

    try {

      const existingTransport =
        await Transport.findOne({
          busNumber:
            req.body.busNumber
        });

      if (existingTransport) {
        return res.status(400).json({
          success: false,
          message:
            "Bus Number already exists"
        });
      }

      const transport =
        await Transport.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Transport Added Successfully",
        transport
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// Get All Transport
export const getTransport =
  async (req, res) => {

    try {

      const transport =
        await Transport.find()
          .populate(
            "schoolId"
          )
          .populate(
            "assignedStudents"
          );

      res.status(200).json({
        success: true,
        transport
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// Update Transport
export const updateTransport =
  async (req, res) => {

    try {

      const existingTransport =
        await Transport.findOne({
          busNumber:
            req.body.busNumber,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingTransport) {
        return res.status(400).json({
          success: false,
          message:
            "Bus Number already exists"
        });
      }

      const transport =
        await Transport.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!transport) {
        return res.status(404).json({
          success: false,
          message:
            "Transport not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Transport Updated Successfully",
        transport
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// Delete Transport
export const deleteTransport =
  async (req, res) => {

    try {

      const transport =
        await Transport.findByIdAndDelete(
          req.params.id
        );

      if (!transport) {
        return res.status(404).json({
          success: false,
          message:
            "Transport not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Transport Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };