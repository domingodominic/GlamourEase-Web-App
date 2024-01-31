import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "../../scss/style.css";

export default function Datepicker({ selectDate }) {
  // Calculate the current date
  const currentDate = dayjs();
  const handleDateChange = (date) => {
    selectDate(date.format("MM/DD/YYYY"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleDateChange}
        minDate={currentDate} // to disable the past dates
      />
    </LocalizationProvider>
  );
}
