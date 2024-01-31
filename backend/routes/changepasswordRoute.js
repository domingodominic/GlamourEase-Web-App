import express from "express";
import { userAccount } from "../model/userAccountModel.js";
import { customer } from "../model/customerModel.js";
import { providermodel } from "../model/providermodel.js";

const router = express.Router();

// Change Pass

// Update Profile Info
router.put("/updateProfile/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    age,
    birthdate,
    municipality,
    contactNumber,
    profilePicture,
  } = req.body;

  try {
    const user = await userAccount.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile info based on the user role
    if (user.role === "customer") {
      await customer.updateOne(
        { userAccount: id },
        {
          $set: {
            firstname,
            lastname,
            age,
            birthdate,
            municipality,
            contactNumber,
            profilePicture,
          },
        }
      );
    } else if (user.role === "provider") {
      await providermodel.updateOne(
        { userAccount: id },
        {
          $set: {
            firstname,
            lastname,
            age,
            birthdate,
            municipality,
            contactNumber,
            profilePicture,
          },
        }
      );
    }

    res.json({ message: "Profile information updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.post("/accountCheck", async (request, response) => {
  try {
    const email = request.body.email;
    const isExist = await userAccount.findOne({ email });
    console.log("the account is ", isExist);

    if (isExist) {
      response
        .status(200)
        .json({ success: true, exist: true, accountInfo: isExist });
    } else {
      response.status(200).json({ success: true, exist: false });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
export default router;
