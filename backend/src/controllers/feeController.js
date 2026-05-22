import Fee from "../models/Fee.js";

// Add Fee
export const addFee = async (
  req,
  res
) => {
  try {
    const fee =
      await Fee.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Fee added successfully",
      fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Fees
export const getFees = async (
  req,
  res
) => {
  try {
    const fees =
      await Fee.find()
        .populate("studentId")
        .populate("schoolId");

    res.status(200).json({
      success: true,
      fees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};