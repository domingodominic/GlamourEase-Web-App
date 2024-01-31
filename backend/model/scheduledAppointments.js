import mongoose from "mongoose";

const scheduledAppointmentSchema = mongoose.Schema(
  {
    serviceName: {
      type: String,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: String,
      required: true,
    },
    serviceDate: {
      type: String,
      required: true,
    },
    serviceTime: {
      type: String,
      required: true,
    },
    serviceImage: {
      type: String,
      required: true,
    },
    serviceReferenceNo: {
      type: String,
      required: true,
    },
    appointmentState: {
      type: String,
      default: "pending",
    },
    isReminded: { type: Boolean, default: false },
    isRated: { type: Boolean, default: false },
    readyToRate: { type: Boolean, default: false },
    providerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "providermodel",
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  },
  {
    timestamps: true,
  }
);

export const scheduledAppointment = mongoose.model(
  "Appointments",
  scheduledAppointmentSchema
);
