import School from "../models/School.js";

// Create School
export const createSchool = async (
  req,
  res
) => {
  try {
    const school = await School.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message:
        "School created successfully",
      school
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Schools
export const getSchools = async (
  req,
  res
) => {
  try {
    const schools =
      await School.find();

    res.status(200).json({
      success: true,
      schools
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};