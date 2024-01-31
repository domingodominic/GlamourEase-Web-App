import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Timepicker from "./provider/Timepicker";
import Slide from "@mui/material/Slide";
import Datepicker from "./provider/Datepicker";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ThemeContext } from "../App";
import DatePickerForAddTime from "./provider/DatePickerForAddTime";
import axios from "axios";
import { server_url } from "../serverUrl";
import { enqueueSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AskUserToAdd({
  dialogAddState,
  setDialogAddState,
  serviceID,
  getUpdatedData,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [serviceTime, setServicetime] = useState([]);
  const { providerDatas } = useContext(ThemeContext);

  const dateSelected = (date) => {
    setSelectedDate(date);
  };

  const addTime = (newTime) => {
    setServicetime([...serviceTime, newTime]);
  };
  const removeTime = (index) => {
    const updatedTimeList = [...serviceTime];
    updatedTimeList.splice(index, 1);
    setServicetime(updatedTimeList);
  };

  const handleClose = () => {
    setDialogAddState(false);
  };

  const handleSubmit = async () => {
    const providerID = providerDatas.providerData._id;

    try {
      const response = await axios.post(
        `${server_url}/provider/AddDateTime/${providerID}/${serviceID}`,
        {
          date: selectedDate,
          time: serviceTime,
        }
      );
      if (response.status === 200) {
        await getUpdatedData();
        enqueueSnackbar("Succesfully added time and date", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Somwthing went wrong. Please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={dialogAddState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add additional Date and Time</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add date and time as many as you want.
          </DialogContentText>

          <div>
            <h6>Select Date:</h6>
            <div>
              <DatePickerForAddTime dateSelected={dateSelected} />
            </div>
          </div>
          <div>
            <h6>Select Time:</h6>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <Timepicker
                  addTime={addTime}
                  removeTime={removeTime}
                  serviceTime={serviceTime}
                />
              </div>
            </div>
          </div>
          <div className="flex justify--content--c">
            <button
              onClick={() => handleSubmit()}
              style={{
                backgroundColor: "#ff9a9c",
                padding: "5px 20px",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              SAVE
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AskUserToAdd;
