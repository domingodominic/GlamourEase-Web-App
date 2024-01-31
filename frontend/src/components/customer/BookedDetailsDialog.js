import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { server_url } from "../../serverUrl";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";
import { useContext } from "react";
//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BookedDetailsDialog({ isOpen, setDialogClose, serviceData }) {
  //STATES
  const [loading, setLoading] = useState(false);
  const [providerData, setProviderData] = useState({});
  const { theme } = useContext(ThemeContext);
  const handleDialog = () => {
    setDialogClose(false);
  };

  useEffect(() => {
    const getProviderData = async () => {
      try {
        setLoading(true);
        console.log(serviceData.providerID);
        const getProviderData = await axios.get(
          `${server_url}/provider/getProvider/${serviceData.providerID}`
        );

        if (getProviderData.status === 200) {
          setProviderData(getProviderData.data.provider);
          setLoading(false);
        }
      } catch (error) {
        console.log("internal server error ", error);
        setLoading(false);
      }
    };

    if (serviceData.providerID) {
      getProviderData();
    }
  }, [serviceData.providerID]);

  //the dialog component shows the appointments and branch information
  const AppointmentsDialog = () => {
    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <img
            src={serviceData.serviceImage}
            alt="service image"
            width="100%"
          />

          <h4>Service details :</h4>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Service name : </p>
            <p className={`details--value`}>{serviceData.serviceName}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Service price : </p>
            <p className={`details--value`}>{serviceData.servicePrice}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Service description : </p>
            <p className={`details--value`}>{serviceData.serviceDescription}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Scheduled date :</p>
            <p className={`details--value`}>{`${new Date(
              serviceData.serviceDate
            ).toDateString()}`}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Scheduled time :</p>
            <p className={`details--value`}> {serviceData.serviceTime}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Transaction date :</p>
            <p className={`details--value`}>
              {new Date(serviceData.createdAt).toDateString()}
            </p>
          </div>
          <h4>Branch information</h4>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Branch name :</p>
            <p className={`details--value`}>{providerData.businessName}</p>
          </div>
          <div className={`details--container--service--${theme}`}>
            <p className={`details--title`}>Email :</p>{" "}
            <p className={`details--value`}>{providerData.businessEmail}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  return <>{loading ? <Linear /> : <AppointmentsDialog />}</>;
}

export default BookedDetailsDialog;
