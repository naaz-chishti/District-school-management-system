import Teacher from "../models/Teacher.js";

// Add Teacher
export const addTeacher = async (
  req,
  res
) => {
  try {
    const teacher =
      await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Teacher added successfully",
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Teachers
export const getTeachers =
  async (req, res) => {
    try {
      const teachers =
        await Teacher.find().populate(
          "schoolId"
        );

      res.status(200).json({
        success: true,
        teachers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };