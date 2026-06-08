import Student from "../models/Student.js";

// Add Student
export const addStudent = async (req, res) => {
  try {

    const existingStudent =
      await Student.findOne({
        studentId: req.body.studentId
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student ID already exists"
      });
    }

    const student =
      await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
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

export const getSingleStudent =
  async (req, res) => {

    try {

      const student =
        await Student.findById(
          req.params.id
        ).populate(
          "schoolId"
        );

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found"
        });
      }

      res.status(200).json({
        success: true,
        student
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Update Student
// Update Student
export const updateStudent = async (
  req,
  res
) => {
  try {

    const existingStudent =
      await Student.findOne({
        studentId: req.body.studentId,
        _id: { $ne: req.params.id }
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student ID already exists"
      });
    }

    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student Updated Successfully",
      student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete Student
export const deleteStudent =
  async (req, res) => {
    try {

      await Student.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Student deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

  