import express, { request, response } from "express";
import { scheduledAppointment } from "../model/scheduledAppointments.js";
import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
const router = express.Router();

router.post("/schedulingAppointment", async (request, response) => {
  try {
    if (
      !request.body.serviceName ||
      !request.body.serviceDescription ||
      !request.body.servicePrice ||
      !request.body.date ||
      !request.body.time ||
      !request.body.serviceImage ||
      !request.body.customerID ||
      !request.body.branchID
    ) {
      console.log("Please supply all the data needed");
    } else {
      const newAppointment = {
        serviceName: request.body.serviceName,
        serviceDescription: request.body.serviceDescription,
        servicePrice: request.body.servicePrice,
        serviceTime: request.body.time,
        serviceDate: request.body.date,
        serviceImage: request.body.serviceImage,
        serviceReferenceNo: request.body.referenceNo,
        providerID: request.body.branchID,
        customerID: request.body.customerID,
      };

      const addNewAppointment = await scheduledAppointment.create(
        newAppointment
      );

      response.status(201).send(addNewAppointment);
    }
  } catch (error) {
    console.log(error);
  }
});
//get customers booked on the provider side
router.get("/getCustomers", async (request, response) => {
  const id = request.query.id;

  try {
    const customer = await scheduledAppointment.find({ providerID: id });

    response.json(customer);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//get customer infomration this is connected with the appointment details, the data will use by the provider

router.get("/getCustomersInfo", async (request, response) => {
  const id = request.query.id;
  console.log("supplied id is ", id);
  try {
    const data = await userAccount.find({ _id: id });

    response.json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getBookedService/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const services = await scheduledAppointment.find({ customerID: id });

    response.json(services);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getToBeRatedAppointments/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const getAppointments = await scheduledAppointment.find({ customerID: id });

    const toBeRatedAppointments = getAppointments
      .filter((appointments) => appointments.isRated === false)
      .filter((appointments) => appointments.readyToRate === true);

    response.json(toBeRatedAppointments);
  } catch (error) {
    console.log("internal server error ", error);
  }
});

router.put("/setToBeRated/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const result = await scheduledAppointment.updateOne(
      { _id: id },
      { $set: { readyToRate: true } }
    );

    if (result.nModified > 0) {
      // The update was successful
      response.json({ message: "Service is ready to be rated" });
    } else {
      // No document was modified, meaning the document with the provided ID wasn't found
      response.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.put("/setRated/:id", async (request, response) => {
  const { id } = request.params;
  await scheduledAppointment.updateOne(
    { _id: id },
    { $set: { isRated: true } }
  );

  response.json("updated rating state successfuly");
});

router.get("/totalAppointments", async (request, response) => {
  const appointments = await scheduledAppointment.find({});

  response.json(appointments);
});

router.put("/approveAppointments/:appointmentID", async (request, response) => {
  const { appointmentID } = request.params;
  const { status } = request.body;

  console.log(status);

  const appointment = await scheduledAppointment.updateOne(
    { _id: appointmentID },
    { $set: { appointmentState: status } }
  );

  response.json(appointment);
});
export default router;
