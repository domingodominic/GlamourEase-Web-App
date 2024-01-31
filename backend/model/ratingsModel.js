import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  ratingsValue: {
    type: Number,
    required: true,
  },

  providerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "provider",
  },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "scheduledAppointment",
  },
});

export const ratingModel = mongoose.model("ratings", ratingSchema);
