import School from "../models/School.js";


// Create School
export const createSchool =
  async (req, res) => {
    try {

      const school =
        await School.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "School Created Successfully",
        school
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Get All Schools
export const getSchools =
  async (req, res) => {
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
        message:
          error.message
      });
    }
  };


// Get Single School
export const getSingleSchool =
  async (req, res) => {
    try {

      const school =
        await School.findById(
          req.params.id
        );

      if (!school) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "School not found"
          });
      }

      res.status(200).json({
        success: true,
        school
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Update School
export const updateSchool =
  async (req, res) => {
    try {

      const school =
        await School.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json({
        success: true,
        message:
          "School Updated Successfully",
        school
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete School
export const deleteSchool =
  async (req, res) => {
    try {

      await School.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "School Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };