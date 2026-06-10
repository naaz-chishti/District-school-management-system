import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    class: {
      type: String,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    rollNumber: {
      type: Number,
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    transportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
      default: null
    },

    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      default: null
    },

    dob: {
      type: Date
    },

    fatherName: {
  type: String,
  default: ""
},

fatherPhone: {
  type: String,
  default: ""
},

fatherOccupation: {
  type: String,
  default: ""
},

motherName: {
  type: String,
  default: ""
},

motherOccupation: {
  type: String,
  default: ""
},

    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },

    address: {
      type: String
    },

    photo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model(
  "Student",
  studentSchema
);

export default Student;