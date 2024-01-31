import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";

export default function Timepicker({ addTime, removeTime, serviceTime }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSelectedTime(null); // Clear the selected time when serviceTime changes
  }, [serviceTime]);

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const addSelectedTime = () => {
    if (selectedTime) {
      addTime(selectedTime.format("hh:mm A"));
    } else {
      enqueueSnackbar("Time value is invalid", { variant: "error" });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="service time"
        onChange={handleTimeChange}
        value={selectedTime}
        sx={{ width: "100%" }}
      />
      <div style={{ marginTop: "1rem" }}>
        <button
          type="button"
          onClick={addSelectedTime}
          style={{
            border: "none",
            backgroundColor: "#ff9a9c",
            color: "white",
            fontSize: "13px",
          }}
        >
          Add Time
        </button>
      </div>

      <p
        style={{
          textAlign: "start",
          fontSize: "12px",
          color: "gray",
          marginTop: "1rem",
        }}
      >
        Your service time will appear here:
      </p>
      <div>
        <ul className="timelist--container">
          {serviceTime?.map((time, i) => (
            <Tooltip title="delete?" placement="top" arrow key={i}>
              <li className="timelist" key={i} onClick={() => removeTime(i)}>
                {time}
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </LocalizationProvider>
  );
}
