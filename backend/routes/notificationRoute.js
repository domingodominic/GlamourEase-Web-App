import express from "express";
import { notification } from "../model/notificationModel.js";

const router = express.Router();

router.post("/newNotification", async (request, response) => {
  try {
    const { recipient_id, sender_id, content, status } = request.body;

    // Create a new notification
    const newNotification = new notification({
      recipient_id,
      sender_id,
      content,
      status,
    });

    const savedNotification = await newNotification.save();

    response.status(200).json(savedNotification);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//get notif via provider ID

router.get("/getNotification/:providerID", async (request, response) => {
  const { providerID } = request.params;

  const res = await notification.find({ recipient_id: providerID });

  if (res) {
    response.status(200).json({ res });
  }
});

//update notification in provider status

router.put("/openNotification/:notificationID", async (request, response) => {
  const { notificationID } = request.params;
  const { status } = request.body;

  try {
    const notif = await notification.findOne({ _id: notificationID });

    if (notif) {
      await notification.updateOne(
        { _id: notificationID },
        { $set: { status: status } }
      );
      response
        .status(200)
        .json({ message: "Notification status updated successfully" });
    } else {
      response.status(404).json({ message: "Notification not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
