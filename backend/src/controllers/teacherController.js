import Teacher from "../models/Teacher.js";

// Add Teacher
export const addTeacher =
  async (req, res) => {

    try {

      const existingTeacherId =
        await Teacher.findOne({
          teacherId:
            req.body.teacherId
        });

      if (existingTeacherId) {
        return res.status(400).json({
          success: false,
          message:
            "Teacher ID already exists"
        });
      }

      const existingEmail =
        await Teacher.findOne({
          email:
            req.body.email
        });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Teacher Email already exists"
        });
      }

      const teacher =
        await Teacher.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Teacher Added Successfully",
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

      const existingTeacherId =
        await Teacher.findOne({
          teacherId:
            req.body.teacherId,
          _id: {
            $ne:
              req.params.id
          }
        });

      if (existingTeacherId) {
        return res.status(400).json({
          success: false,
          message:
            "Teacher ID already exists"
        });
      }

      const existingEmail =
        await Teacher.findOne({
          email:
            req.body.email,
          _id: {
            $ne:
              req.params.id
          }
        });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Teacher Email already exists"
        });
      }

      const teacher =
        await Teacher.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message:
            "Teacher not found"
        });
      }

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