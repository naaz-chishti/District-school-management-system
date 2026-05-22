import mongoose from "mongoose";

const settingSchema =
  new mongoose.Schema(
    {
      schoolName: String,
      schoolEmail: String,
      schoolPhone: String,
      academicYear: String,
      timezone: String
    },
    {
      timestamps: true
    }
  );

const Setting =
  mongoose.model(
    "Setting",
    settingSchema
  );

export default Setting;