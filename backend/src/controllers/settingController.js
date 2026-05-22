import Setting from "../models/Setting.js";

// Save Settings
export const saveSettings =
  async (req, res) => {
    try {
      const settings =
        await Setting.create(
          req.body
        );

      res.status(201).json({
        success: true,
        settings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

// Get Settings
export const getSettings =
  async (req, res) => {
    try {
      const settings =
        await Setting.find();

      res.status(200).json({
        success: true,
        settings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };