import React, { useEffect, useContext } from "react";
import useAppointmentStore from "../store/useAppointmentStore";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import axios from "axios";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { ThemeContext } from "../../App";
import { IoIosArrowForward } from "react-icons/io";
import Linear from "../loaders_folder/Linear";
import { useSnackbar } from "notistack";
import { server_url } from "../../serverUrl";
import useBookingPageClass from "../store/useBookingPageClass";
import { IoLocationOutline } from "react-icons/io5";
import BranchDetailsDialog from "./BranchDetailsDialog";

function SelectBranch({ setStep }) {
  const [branches, setBranchs] = useState();
  const [loading, isLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [branchDialogStates, setBranchDialogStates] = useState({});
  const { municipality, setBranchID, setServices, setBranchEmail, setBranch } =
    useAppointmentStore();
  const { currentClassname, setCurrentClassname } = useBookingPageClass();
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);

      if (!municipality) {
        enqueueSnackbar("You didn't select your prefered municipality", {
          variant: "error",
        });
      }
      try {
        const response = await axios.get(
          `${server_url}/user/branches/${municipality}`
        );

        setBranchs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchRatingInformation = async (providerID) => {
    const res = await axios.get(
      `${server_url}/ratings/ratingInformation/${providerID}`
    );

    setRatingDetails(res.data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = (services, branchID, email, branchName) => {
    setServices(services);
    setBranchID(branchID);
    setBranchEmail(email);
    setBranch(branchName);
    setCurrentClassname("classname--rightslide");
  };

  return (
    <div className={!loading ? currentClassname : null}>
      {loading ? (
        <Linear />
      ) : branches && branches[0]?.branches && branches[0]?.user ? (
        <ul className="service--lists service--list">
          <div className={`mb--municipality`}>
            <h4 className={`title color--${theme} municipality--page--title`}>
              Select Branch
            </h4>
            <p style={{ margin: "0", marginBottom: "2rem", color: "gray" }}>
              Please select a branch.
            </p>
            {/* <input
          type="text"
          placeholder="search..."
          value={municipality}
          onChange={(e) => setCurrentMunicipality(e.target.value)}
        /> */}
          </div>
          {branches[0].branches.map((branch, i) => (
            <li className={`list--${theme} municipality--list`} key={i}>
              <BranchDetailsDialog
                handleClose={handleClose}
                isOpen={isOpen}
                Details={branch}
                ratingDetails={ratingDetails}
              />
              <div className="details--container">
                <div>
                  <div>
                    <h4 style={{ margin: "0" }} className={`color--${theme}`}>
                      {branch.businessName}
                    </h4>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "10px",
                        color: "gray !important",
                      }}
                      className={`color--${theme}`}
                    >
                      {branch.businessDescription}
                    </p>
                    <div className="flex justify--content--s gap-5">
                      <Rating
                        name="half-rating-read"
                        size="small"
                        value={branch.ratingsTotal / branch.ratingsCount}
                        precision={0.5}
                        readOnly
                      />
                      <p
                        style={{ margin: "0", color: "gray", fontSize: "12px" }}
                      >{`${branch.ratingsTotal / branch.ratingsCount} / 5 `}</p>
                    </div>
                  </div>

                  <p
                    style={{
                      margin: "0",
                      color: "skyblue",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: "12px",
                      paddingBottom: "3px",
                    }}
                    onClick={async () => {
                      await fetchRatingInformation(branch._id);
                      setOpen(true);
                    }}
                  >
                    view full details
                  </p>
                </div>
                <div
                  className={`color--${theme}`}
                  onClick={() => {
                    setOpen(false);
                    handleNext(
                      branch.services,
                      branch._id,
                      branch.businessEmail,
                      branch.businessName
                    );
                    setStep(2);
                  }}
                >
                  <IoIosArrowForward />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4.5rem",
          }}
        >
          <div>
            <img
              src={require("../../images/noServices.png")}
              alt="think image"
              style={{ width: "200px" }}
            />
            <p style={{ color: "gray" }}>No branch available in this City</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectBranch;
