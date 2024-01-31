import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import useAppointmentStore from "../store/useAppointmentStore";
import "../../scss/style.css";

function ReviewAppointment() {
  const { theme, customerProfiles } = useContext(ThemeContext);
  const { chosenService, time, date, branch } = useAppointmentStore();
  const email = customerProfiles.customerProfile.email;
  const contact_no = customerProfiles.customerProfile.contactNumber;
  const generateRefNo = () => {
    const timestamp = new Date().getTime();

    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const referenceNumber = `${timestamp}${randomChar}${Math.floor(
      Math.random() * 1000
    )}`;
  };
  const chosenDate = new Date(date);

  const formattedDate = chosenDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div style={{ padding: "20px" }}>
      <h3 className={`review--title--${theme}`}>Summary</h3>
      <p className={`review--subtitle--${theme}`}>
        Please double check your entries before booking.
      </p>
      <div className="review--divider">
        <p className={`review--service--${theme}`}>Branch name:</p>
        <p className={`review--serviceinfo--${theme}`}>{branch}</p>
      </div>
      <div className="review--divider">
        <p className={`review--service--${theme}`}>Selected Service:</p>
        <p className={`review--serviceinfo--${theme}`}>
          {chosenService.service_name}{" "}
        </p>
        <p className={`review--serviceinfo--${theme}`}>
          {chosenService.service_description}
        </p>
      </div>

      <div className="review--divider">
        <p className={`review--service--${theme}`}> Selected Date & Time:</p>
        <p className={`review--serviceinfo--${theme}`}>
          {`${formattedDate} - ${time}`}
        </p>
      </div>
      <h5 className={`review--title--${theme}`}>PERSONAL DETAILS</h5>
      <div className="review--divider">
        <p className={`review--service--${theme}`}>Mobile Number</p>
        <p className={`review--serviceinfo--${theme}`}>{contact_no}</p>
      </div>
      <div className="review--divider">
        <p className={`review--service--${theme}`}>Email</p>
        <p className={`review--serviceinfo--${theme}`}>{email}</p>
      </div>
      <p style={{ fontSize: "12px" }} className={`color--${theme}`}>
        By booking an appointment, you agree to our Terms and conditions
      </p>
    </div>
  );
}

export default ReviewAppointment;
