import { Dialog, DialogContent } from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useContext } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { ThemeContext } from "../../App";

//transition

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DisplayServiceInfo({
  serviceData,
  DisplayServiceState,
  setDisplayServiceDialog,
}) {
  const { theme } = useContext(ThemeContext);
  const handleClose = () => {
    setDisplayServiceDialog(false);
  };

  return (
    <>
      <Dialog
        open={DisplayServiceState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <img
            src={serviceData.service_image}
            alt="Service image"
            style={{ width: "100%" }}
          />
          <p
            className={`dialog--details--title--${theme}`}
            style={{
              backgroundColor: "skyblue",
              color: "white",
              padding: ".5rem",
            }}
          >
            Details :
          </p>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Name : </p>
            <p>{serviceData.service_name}</p>
          </div>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Description :</p>
            <p>{serviceData.service_description}</p>
          </div>
          <div className={`dialog--service--container`}>
            <p className={`dialog--service--${theme}`}>Price : </p>
            <p>{serviceData.service_price}</p>
          </div>
          <div>
            <p
              className={`dialog--details--title--${theme}`}
              style={{
                backgroundColor: "skyblue",
                color: "white",
                padding: ".5rem",
              }}
            >
              available schedule:
            </p>

            {serviceData.timeAndDate.map((date, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px dashed gray", padding: "20px 0" }}
              >
                <div className="flex justify--content--s gap-3">
                  <CiCalendarDate width={20} />
                  <p className="margin-1">
                    {new Date(date.service_date).toDateString()}
                  </p>
                </div>

                <ul className="timelist--container">
                  {date.availability_time.map((time, i) => (
                    <li key={i} className="timelist--items">
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DisplayServiceInfo;
