import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
import express, { request, response } from "express";
import { ratingModel } from "../model/ratingsModel.js";
import { customer } from "../model/customerModel.js";

const route = express.Router();

route.post(
  "/customerRating/:providerID/:customerID/:appointmentID",
  async (request, response) => {
    const { providerID, customerID, appointmentID } = request.params;
    const { comments, value } = request.body;
    console.log(comments, value, providerID, customerID, appointmentID);

    const newRating = new ratingModel({
      comment: comments,
      customerID,
      providerID,
      appointmentID,
      ratingsValue: value,
    });

    await newRating.save();
  }
);
route.get("/ratingInformation/:providerID", async (request, response) => {
  try {
    const { providerID } = request.params;
    console.log("provider id ", providerID);

    const customers = [];
    // Use find to get all ratings matching the providerID
    const ratings = await ratingModel.find({ providerID: providerID });

    if (ratings.length === 0) {
      console.log("Ratings not found");
      return response.json("noratings");
    }

    // Initialize an array to store customer information for each rating

    // Iterate through each rating and find the corresponding customer
    for (const rating of ratings) {
      const customerExist = await userAccount.findOne({
        _id: rating.customerID,
      });

      if (customerExist) {
        customers.push({
          rating: rating.ratingsValue,
          ratingComment: rating.comment,
          customerName: customerExist.firstname + " " + customerExist.lastname,
          customerProfile: customerExist.profilePicture,
        });
      }
    }

    if (customers.length === 0) {
      console.log("Customers not found");
      return response.status(404).send("Customers not found");
    }

    response.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching rating information:", error);
    response.status(500).send("Internal Server Error");
  }
});

export default route;
