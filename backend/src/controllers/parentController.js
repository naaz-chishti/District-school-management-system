import Parent from "../models/Parent.js";

// Add Parent
export const addParent = async (
  req,
  res
) => {
  try {

    const existingParent =
      await Parent.findOne({
        phone: req.body.phone
      });

    if (
      req.body.phone &&
      existingParent
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Phone Number already exists"
      });
    }

    const parent =
      await Parent.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Parent Added Successfully",
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

      const existingParent =
        await Parent.findOne({
          phone: req.body.phone,
          _id: {
            $ne: req.params.id
          }
        });

      if (
        req.body.phone &&
        existingParent
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Phone Number already exists"
        });
      }

      const parent =
        await Parent.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!parent) {
        return res.status(404).json({
          success: false,
          message:
            "Parent not found"
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Parent Updated Successfully",
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