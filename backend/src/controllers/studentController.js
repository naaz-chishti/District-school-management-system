import Student from "../models/Student.js";

// Add Student
export const addStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Student added successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Students
export const getStudents = async (
  req,
  res
) => {
  try {
    const students =
      await Student.find().populate(
        "schoolId"
      );

    res.status(200).json({
      success: true,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};