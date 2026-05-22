import Transport from "../models/Transport.js";

// Add Transport
export const addTransport =
  async (req, res) => {
    try {
      const transport =
        await Transport.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Transport added successfully",
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

// Assign Student To Bus
export const assignStudentToBus =
  async (req, res) => {
    try {
      const {
        transportId,
        studentId
      } = req.body;

      const transport =
        await Transport.findById(
          transportId
        );

      if (!transport) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Transport not found"
          });
      }

      transport.assignedStudents.push(
        studentId
      );

      await transport.save();

      res.status(200).json({
        success: true,
        message:
          "Student assigned successfully",
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

// Update Boarding Status
export const updateBoardingStatus =
  async (req, res) => {
    try {
      const {
        transportId,
        status
      } = req.body;

      const transport =
        await Transport.findByIdAndUpdate(
          transportId,
          {
            boardingStatus:
              status,
            parentAlertSent:
              true
          },
          { new: true }
        );

      res.status(200).json({
        success: true,
        message:
          `Student ${status}`,
        parentAlert:
          "Parent notified",
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