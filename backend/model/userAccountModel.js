import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userAccount = mongoose.model("User", userSchema);
