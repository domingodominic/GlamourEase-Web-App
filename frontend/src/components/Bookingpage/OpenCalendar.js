import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import { Dialog, DialogContent } from "@mui/material";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function OpenCalendar({
  setCalendarState,
  calendarState,
  compareDateInCalendarDialog,
}) {
  const currentDate = dayjs();

  const handleClose = () => {
    setCalendarState(false);
  };
  const handleDateChange = (date) => {
    compareDateInCalendarDialog(date.format("MM/DD/YY"));
  };
  return (
    <Dialog
      open={calendarState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar minDate={currentDate} onChange={handleDateChange} />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
}

export default OpenCalendar;
