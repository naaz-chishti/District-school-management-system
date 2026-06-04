import mongoose from "mongoose";

const parentSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false 
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
        required: false
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