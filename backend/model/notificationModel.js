import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
    recipient_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" },
    content: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export const notification = mongoose.model("Notification", notificationSchema);
