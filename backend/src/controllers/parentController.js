import Parent from "../models/Parent.js";

// Add Parent
export const addParent = async (
  req,
  res
) => {
  try {
    const parent =
      await Parent.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Parent added successfully",
      parent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Parents
export const getParents =
  async (req, res) => {
    try {
      const parents =
        await Parent.find()
          .populate("children")
          .populate("userId");

      res.status(200).json({
        success: true,
        parents
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update Parent
export const updateParent =
  async (req, res) => {
    try {

      const parent =
        await Parent.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Parent updated successfully",
        parent
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Delete Parent
export const deleteParent =
  async (req, res) => {
    try {

      await Parent.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Parent deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };