import cron from "node-cron";
import { scheduledAppointment } from "./model/scheduledAppointments.js";
import { userAccount } from "./model/userAccountModel.js";
import nodemailer from "nodemailer";

cron.schedule("* * * * *", async () => {
  console.log("work every minute");
  //calculate tomorrow date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  //query appointments, check if any appointments for tomorrow's date, regardless of the time

  const appointments = await scheduledAppointment.find({
    serviceDate: tomorrow,
  });

  for (const appointment of appointments) {
    //get user credentials
    const user = await userAccount.findById({ _id: appointment.customerID });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "glamourease@gmail.com",
        pass: "vuew eavy gzcy qwrq",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "glamourEase@gmail.com",
      to: user.email,
      subject: "Tomorrow Appointment",
      text: "Good day, this is an auto generated email that reminds you that you have appointments for tomorrow.",
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
});

const tryLang = () => {
  cron.schedule("* * * * *", () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "glamourease@gmail.com",
        pass: "vuew eavy gzcy qwrq",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "glamourEase@gmail.com",
      to: "dominicpunladomingo120@gmail.com",
      subject: "Tomorrow Appointment",
      text: "Good day, this is an auto generated email that reminds you that you have appointments for tomorrow.",
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};

export default tryLang;
