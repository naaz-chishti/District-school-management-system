import Setting from "../models/Setting.js";


// Create / Update Settings
export const saveSettings =
  async (req, res) => {

    try {

      const {
        schoolName,
        schoolEmail,
        schoolPhone,
        academicYear,
        timezone
      } = req.body;

      if (
        !schoolName ||
        !schoolEmail ||
        !schoolPhone ||
        !academicYear
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all required fields"
        });
      }

      let settings =
        await Setting.findOne();

      if (settings) {

        settings =
          await Setting.findByIdAndUpdate(
            settings._id,
            {
              schoolName,
              schoolEmail,
              schoolPhone,
              academicYear,
              timezone
            },
            {
              new: true,
              runValidators: true
            }
          );

      } else {

        settings =
          await Setting.create({
            schoolName,
            schoolEmail,
            schoolPhone,
            academicYear,
            timezone
          });
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

      if (!setting) {
        return res.status(404).json({
          success: false,
          message:
            "Setting not found"
        });
      }

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

      const setting =
        await Setting.findByIdAndDelete(
          req.params.id
        );

      if (!setting) {
        return res.status(404).json({
          success: false,
          message:
            "Setting not found"
        });
      }

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