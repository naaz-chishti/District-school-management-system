import Hostel from "../models/Hostel.js";

// Add Hostel
// Add Hostel
export const addHostel =
  async (req, res) => {

    try {

      const existingHostel =
        await Hostel.findOne({
          hostelName:
            req.body.hostelName,
          roomNumber:
            req.body.roomNumber
        });

      if (existingHostel) {
        return res.status(400).json({
          success: false,
          message:
            "Hostel Room already exists"
        });
      }

      const hostel =
        await Hostel.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Hostel Added Successfully",
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

      if (
  hostel.assignedStudents.includes(
    studentId
  )
) {
  return res.status(400).json({
    success: false,
    message:
      "Student already assigned to this hostel"
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

   // Update Hostel
// Update Hostel
export const updateHostel =
  async (req, res) => {

    try {

      const existingHostel =
        await Hostel.findOne({
          hostelName:
            req.body.hostelName,
          roomNumber:
            req.body.roomNumber,
          _id: {
            $ne: req.params.id
          }
        });

      if (existingHostel) {
        return res.status(400).json({
          success: false,
          message:
            "Hostel Room already exists"
        });
      }

      const hostel =
        await Hostel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!hostel) {
        return res.status(404).json({
          success: false,
          message:
            "Hostel not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Hostel Updated Successfully",
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


// Delete Hostel
export const deleteHostel =
  async (req, res) => {

    try {

      const hostel =
        await Hostel.findByIdAndDelete(
          req.params.id
        );

      if (
        !hostel
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Hostel not found"
          });
      }

      res.status(200).json({
        success: true,
        message:
          "Hostel deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };