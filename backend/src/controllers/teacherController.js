import Teacher from "../models/Teacher.js";

// Add Teacher
export const addTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Teacher added successfully",
        teacher
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get All Teachers
export const getTeachers =
  async (req, res) => {

    try {

      const teachers =
        await Teacher.find()
          .populate(
            "schoolId"
          );

      res.status(200).json({
        success: true,
        teachers
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Update Teacher
export const updateTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Teacher Updated Successfully",
        teacher
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete Teacher
export const deleteTeacher =
  async (req, res) => {

    try {

      await Teacher.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Teacher Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };