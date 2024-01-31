import { providermodel } from "../model/providermodel.js";
import { userAccount } from "../model/userAccountModel.js";
import express, { request, response } from "express";

const route = express.Router();

//route - provider
route.post("/signup/", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.email ||
      !request.body.birthdate ||
      !request.body.municipality ||
      !request.body.businessName ||
      !request.body.businessEmail ||
      !request.body.contactNumber ||
      !request.body.businessDescription ||
      !request.body.businessAddress ||
      !request.body.role
    ) {
      return response.status(400).send({
        message: "Send all required fields! ",
      });
    }

    const createdUserAcc = await userAccount.create({
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      age: request.body.age,
      birthdate: request.body.birthdate,
      municipality: request.body.municipality,
      contactNumber: request.body.contactNumber,
      profilePicture: request.body.profilePicture,
      role: request.body.role,
    });

    const provider = await userAccount.create(createdUserAcc);
    const newProvider = {
      userAccount: createdUserAcc._id,
      businessDescription: request.body.businessDescription,
      businessEmail: request.body.businessEmail,
      businessName: request.body.businessName,
      businessAddress: request.body.businessAddress,
    };
    const providerAcc = await providermodel.create(newProvider);
    return response.status(201).send(newProvider);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

route.post("/addService/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      service_name,
      service_description,
      service_price,
      service_date,
      availability_time,
      service_image,
    } = req.body;

    // Create a new service object
    const newService = {
      service_name,
      service_description,
      service_price,
      service_image,
      timeAndDate: {
        service_date,
        availability_time,
      },
    };

    // Find the provider by ID and push the new service to the services array
    const provider = await providermodel.findByIdAndUpdate(
      id,
      {
        $push: { services: newService },
      },
      { new: true }
    );

    res.status(201).json(provider); // Return the updated provider
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting service." });
  }
});

//customer for update their profile picture
route.put("/updateProfilePicture/:id", async (req, res) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  try {
    const Foundcustomer = await userAccount.findByIdAndUpdate(id, {
      profilePicture,
    });

    if (!Foundcustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Profile picture updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

//route all get

route.get("/", async (request, response) => {
  try {
    const provider = await providermodel.find({});

    return response
      .status(200)
      .json({ count: provider.length, data: provider });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

route.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const provider = await providermodel.findById(id);

    return response
      .status(200)
      .json({ count: provider.length, data: provider });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Update - services

route.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.firstname ||
      !request.body.lastname ||
      !request.body.username ||
      !request.body.password ||
      !request.body.confirmPassword ||
      !request.body.municipality ||
      !request.body.businessName ||
      !request.body.businessEmail ||
      !request.body.businessContactNumber ||
      !request.body.services
    ) {
      return response.status(400).send({
        message: "Send all required feilds!",
      });
    }

    const { id } = request.params;
    const result = await providermodel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Services not found!" });
    }

    return response
      .status(200)
      .send({ message: "Services updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete - provider
route.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const del = await providermodel.findByIdAndDelete(id);

    return response.status(200).send({ message: "Successful deleted" });
  } catch (error) {
    console.log(error);
  }
});

// Delete specific service
route.delete("/deleteService/:providerId/:serviceId", async (req, res) => {
  const { providerId, serviceId } = req.params;

  try {
    const updatedProvider = await providermodel.findByIdAndUpdate(
      providerId,
      { $pull: { services: { _id: serviceId } } },
      { new: true }
    );

    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({ message: "Service deleted successfully", updatedProvider });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

//update specific service item information
route.put(
  `/updateServiceInfo/:providerID/:serviceID`,
  async (request, response) => {
    const { providerID, serviceID } = request.params;

    const { updatedDetails } = request.body;
    console.log("the updated details is", updatedDetails);

    try {
      const provider = await providermodel.findOne({ _id: providerID });

      if (!provider) {
        console.log("Provider not found");
        return response.status(404).json({ message: "Provider not found" });
      }

      // Check if provider.services is an array before using findIndex
      if (!Array.isArray(provider.services)) {
        return response
          .status(500)
          .json({ message: "Invalid data structure for services" });
      }

      const serviceIndex = provider.services.findIndex((service) => {
        return service._id.equals(serviceID);
      });

      if (serviceIndex === -1) {
        return response.status(404).json({ message: "Service not found" });
      }

      const updatedService = {
        ...provider.services[serviceIndex].toObject(),
        ...updatedDetails,
      };

      provider.services[serviceIndex] = updatedService;
      await provider.save();

      response.json(updatedService);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
);
//additional time and date sa service
route.post("/addDateTime/:providerID/:serviceID", async (request, response) => {
  const { providerID, serviceID } = request.params;
  const { date, time } = request.body;
  console.log("time ", time);

  try {
    const provider = await providermodel.findOne({ _id: providerID });

    if (!provider) {
      console.log("Provider not found");
      return response.status(404).json({ message: "Provider not found" });
    }

    const serviceIndex = provider.services.findIndex((service) => {
      return service._id.equals(serviceID);
    });

    if (serviceIndex === -1) {
      return response.status(404).json({ message: "Service not found" });
    }

    const existingDateIndex = provider.services[
      serviceIndex
    ].timeAndDate.findIndex((dateObj) => dateObj.service_date === date);

    if (existingDateIndex !== -1) {
      // Date already exists, combine the existing time array with the new time array
      if (
        !provider.services[serviceIndex].timeAndDate[existingDateIndex]
          .availability_time
      ) {
        // If availability_time is not initialized, initialize it as an array
        provider.services[serviceIndex].timeAndDate[
          existingDateIndex
        ].availability_time = [];
      }

      // Use Set to ensure unique time values
      const uniqueTimes = new Set([
        ...provider.services[serviceIndex].timeAndDate[existingDateIndex]
          .availability_time,
        ...time,
      ]);

      // Convert Set back to an array
      provider.services[serviceIndex].timeAndDate[
        existingDateIndex
      ].availability_time = [...uniqueTimes];
    } else {
      // Date does not exist, create a new entry for the combined time values
      provider.services[serviceIndex].timeAndDate.push({
        service_date: date,
        availability_time: time,
      });
    }

    await provider.save();

    response.json({ date, time });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

//get the provider data using ID
route.get("/getProvider/:providerID", async (req, res) => {
  try {
    const { providerID } = req.params;

    const provider = await providermodel.findOne({ _id: providerID });

    if (provider) {
      return res.status(200).json({ provider });
    } else {
      return res.status(404).json({ message: "Provider not found" });
    }
  } catch (error) {
    console.error("Error in getProvider route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

route.delete("/services/:userId/dates/:dateId", async (req, res) => {
  try {
    const { userId, dateId } = req.params;

    // Find the provider by ID
    const provider = await providermodel.findById(userId);

    // Check if the provider is found
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    // Check if 'services' is defined and is an array
    if (!provider.services || !Array.isArray(provider.services)) {
      return res
        .status(404)
        .json({ error: "Invalid 'services' property for the provider" });
    }

    // Iterate through each service to find the date
    let dateFound = false;
    provider.services.forEach((service) => {
      // Check if 'timeAndDate' is defined and is an array
      if (service.timeAndDate && Array.isArray(service.timeAndDate)) {
        const dateIndex = service.timeAndDate.findIndex(
          (d) => d._id.toString() === dateId
        );

        // If the date is found, remove it and set the flag to true
        if (dateIndex !== -1) {
          service.timeAndDate.splice(dateIndex, 1);
          dateFound = true;
        }
      }
    });

    // Check if the date exists in any service
    if (!dateFound) {
      return res.status(404).json({ error: "Date not found for the service" });
    }

    // Save the updated provider
    await provider.save();

    // Respond with success message
    res.json({ message: "Date deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update the ratings base on customer rating
route.put("/setRating/:providerID", async (request, response) => {
  try {
    const { providerID } = request.params;
    const { rating } = request.body;
    console.log("rating is ", rating);

    const findProvider = await providermodel.findById({ _id: providerID });

    if (!findProvider) {
      return response.status(404).json({ error: "Provider not found" });
    }

    const updatedRatings = findProvider.ratingsTotal + rating;
    console.log("the updated ratings is ", updatedRatings);
    const updatedRatingCount = findProvider.ratingsCount + 1;

    await providermodel.updateOne(
      { _id: providerID },
      {
        $set: {
          ratingsTotal: updatedRatings,
          ratingsCount: updatedRatingCount,
        },
      }
    );

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/updateAvailabilityTime/:providerId", async (req, res) => {
  try {
    const { providerId } = req.params;
    const { serviceId, service_date, updatedAvailabilityTime } = req.body;

    // Parse the input date string using the Date object
    const inputDate = new Date(service_date);

    // Format the date to "MM/DD/YYYY" format
    const formattedDate = `${(inputDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${inputDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${inputDate.getFullYear()}`;

    console.log("service date is to date string", formattedDate);
    // Find the provider by ID
    const provider = await providermodel
      .findById(providerId)
      .populate("services");
    console.log("service id  is ", serviceId);
    console.log(
      "provider:",
      provider.services[0].timeAndDate[0].availability_time[0]
    );
    // Find the index of the service by _id
    const serviceIndex = provider.services.findIndex(
      (service) => service._id.toString() === serviceId
    );

    console.log("service index ", serviceIndex);
    // Check if service is found
    if (serviceIndex !== -1) {
      // Find the index of the service_date in the timeAndDate array
      const dateIndex = provider.services[serviceIndex].timeAndDate.findIndex(
        (dateObj) => dateObj.service_date === formattedDate
      );

      // Check if date is found
      console.log("date index ", dateIndex);

      // Find the index of the updatedAvailabilityTime in availability_time array
      const timeIndex = provider.services[serviceIndex].timeAndDate[
        dateIndex
      ].availability_time.findIndex((time) => time === updatedAvailabilityTime);

      console.log("time index", timeIndex);
      // Check if time is found
      if (timeIndex !== -1) {
        // Delete the specific availability_time
        provider.services[serviceIndex].timeAndDate[
          dateIndex
        ].availability_time.splice(timeIndex, 1);

        // Save the changes
        await provider.save();

        res.json({ message: "Availability time updated successfully" });
      } else {
        res.status(404).json({ message: "Availability time not found" });
      }
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
