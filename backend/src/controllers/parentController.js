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