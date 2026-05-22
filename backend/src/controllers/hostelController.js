import Hostel from "../models/Hostel.js";

// Add Hostel
export const addHostel =
  async (req, res) => {
    try {
      const hostel =
        await Hostel.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Hostel added successfully",
        hostel
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Get Hostels
export const getHostels =
  async (req, res) => {
    try {
      const hostels =
        await Hostel.find()
          .populate(
            "schoolId"
          )
          .populate(
            "assignedStudents"
          );

      res.status(200).json({
        success: true,
        hostels
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Assign Student To Hostel
export const assignStudentToHostel =
  async (req, res) => {
    try {
      const {
        hostelId,
        studentId
      } = req.body;

      const hostel =
        await Hostel.findById(
          hostelId
        );

      if (!hostel) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Hostel not found"
          });
      }

      if (
        hostel.occupiedBeds >=
        hostel.capacity
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Hostel room full"
          });
      }

      hostel.assignedStudents.push(
        studentId
      );

      hostel.occupiedBeds += 1;

      if (
        hostel.occupiedBeds ===
        hostel.capacity
      ) {
        hostel.status =
          "full";
      }

      await hostel.save();

      res.status(200).json({
        success: true,
        message:
          "Student assigned successfully",
        hostel
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };