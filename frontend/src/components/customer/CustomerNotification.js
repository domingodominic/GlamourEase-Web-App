import React, { useContext, useEffect, useState } from "react";
import NoAvailableToShow from "../NoAvailableToShow";
import NoNotifImg from "../../images/notificationICON.png";
import axios from "axios";
import { ThemeContext } from "../../App";
import { server_url } from "../../serverUrl";
import Linear from "../loaders_folder/Linear";
import Slide from "@mui/material/Slide";
import Rating from "@mui/material/Rating";
import { Icon } from "@iconify/react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Input } from "@mui/base";
import { enqueueSnackbar } from "notistack";

//labels for ratings
const labels = {
  1: "Useless",

  2: "Poor",

  3: "Ok",

  4: "Good",

  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
//transition of mui
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function CustomerNotification() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [loading, setLoading] = useState(false);
  const [ratingList, setRatingList] = useState([]);
  const [providerID, setProviderID] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const [appointmentID, setAppointmentID] = useState(null);
  const [ratingDialog, setRatingDialog] = useState(false);
  const [comments, setComments] = useState("");
  const { userDatas, theme } = useContext(ThemeContext);
  const id = userDatas.userData.userAccount;
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${server_url}/appointments/getToBeRatedAppointments/${id}`
      );

      if (response.status === 200) {
        setLoading(false);
        setRatingList(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const updateProviderRating = async () => {
    try {
      const resProvider = await axios.put(
        `${server_url}/provider/setRating/${providerID}`,
        { rating: value, comments }
      );

      if (resProvider.data.success) {
        await getData();
        enqueueSnackbar("Rate successfuly submitted!", { variant: "info" });
        return true;
      } else {
        console.log("Rating update for provider failed");
        return false;
      }
    } catch (error) {
      console.log(`Error updating provider rating: ${error.message}`);
      return false;
    }
  };

  const postCustomerRating = async () => {
    try {
      setLoading(true);
      const resCustomer = await axios.post(
        `${server_url}/ratings/customerRating/${providerID}/${customerID}/${appointmentID}`,
        { comments, value }
      );

      if (resCustomer.status === 200) {
        setLoading(false);
        console.log("Rated customer successfully");
        return true;
      } else {
        console.log("Error posting customer rating");
        return false;
      }
    } catch (error) {
      console.log(`Error posting customer rating: ${error.message}`);
      return false;
    }
  };

  const markAppointmentAsRated = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${server_url}/appointments/setRated/${appointmentID}`
      );

      if (res.status === 200) {
        setLoading(false);
        console.log("Marked appointment as rated");
        return true;
      } else {
        console.log("Error marking appointment as rated");
        return false;
      }
    } catch (error) {
      console.error(`Error marking appointment as rated: ${error.message}`);
      return false;
    }
  };

  const handleRatings = async () => {
    markAppointmentAsRated();
    updateProviderRating();
    postCustomerRating();
  };

  const handleRatingClose = () => setRatingDialog(false);
  return (
    <div>
      {loading ? (
        <Linear />
      ) : ratingList && ratingList.length > 0 ? (
        <div>
          <h5 className={`color--${theme}`}>Notifications</h5>
          <ul className={`notification--main--container`}>
            {ratingList.map((data, i) => (
              <div
                key={i}
                className={`notification--list--conatiner--${theme}`}
              >
                {data.isRated ? (
                  <li
                    onClick={() => {
                      setProviderID(data.providerID);
                      setCustomerID(data.customerID);
                      setAppointmentID(data._id);
                      setRatingDialog(true);
                    }}
                  >
                    {
                      <div className={`notification--content color--${theme}`}>
                        {`Tells us your experience with your previous ${data.serviceName.toLowerCase()} appointments!`}
                      </div>
                    }
                    <Icon
                      icon="simple-icons:go"
                      className="notification--icon"
                      style={
                        !data.isRated ? { color: "#ff9a9c" } : { color: "gray" }
                      }
                    />
                  </li>
                ) : (
                  <li
                    key={i}
                    onClick={() => {
                      setProviderID(data.providerID);
                      setCustomerID(data.customerID);
                      setAppointmentID(data._id);
                      setRatingDialog(true);
                    }}
                  >
                    {
                      <div className={`notification--content color--${theme}`}>
                        {`Tells us your experience with your previous ${data.serviceName.toLowerCase()} appointments!`}
                      </div>
                    }
                    <Icon
                      icon="simple-icons:go"
                      className="notification--icon"
                      style={
                        !data.isRated ? { color: "#ff9a9c" } : { color: "gray" }
                      }
                    />
                  </li>
                )}
                <p
                  style={{
                    paddingBottom: "3px",
                    color: "skyblue",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  view service details
                </p>
                <p>{new Date(data.createdAt).toDateString()}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <NoAvailableToShow
          definition={"You have no notifications yet"}
          image={NoNotifImg}
        />
      )}
      <Dialog
        open={ratingDialog}
        onClose={handleRatingClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText>Help us improve our business!</DialogContentText>
          <div className="flex justify--content--s">
            <Rating
              name="size-medium"
              defaultValue={2}
              size="medium"
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </div>

          <div style={{ width: "100%", position: "relative" }}>
            <textarea
              rows={7}
              col={25}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="comments/suggestions"
              className="rating--inputfield"
            />
          </div>
          <button onClick={() => handleRatings()}>submit</button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomerNotification;
