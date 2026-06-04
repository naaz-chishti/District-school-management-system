import Setting from "../models/Setting.js";


// Create / Update Settings
export const saveSettings =
  async (req, res) => {

    try {

      let settings =
        await Setting.findOne();

      if (settings) {

        settings =
          await Setting.findByIdAndUpdate(
            settings._id,
            req.body,
            {
              new: true
            }
          );

      } else {

        settings =
          await Setting.create(
            req.body
          );
      }

      res.status(200).json({
        success: true,
        message:
          "Settings Saved Successfully",
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


// Get All Settings
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


// Get Single Setting
export const getSingleSetting =
  async (req, res) => {

    try {

      const setting =
        await Setting.findById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        setting
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// Delete Setting
export const deleteSetting =
  async (req, res) => {

    try {

      await Setting.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Setting Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };