import mongoose from "mongoose";

const parentSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      children: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
      ],

      occupation: {
        type: String,
        default: ""
      },

      phone: {
        type: String,
        required: true
      },

      address: {
        type: String,
        default: ""
      }
    },
    {
      timestamps: true
    }
  );

const Parent = mongoose.model(
  "Parent",
  parentSchema
);

export default Parent;