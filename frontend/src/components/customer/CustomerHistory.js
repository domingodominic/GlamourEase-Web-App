import React, { useContext, useState, useEffect } from "react";
import NoAvailableToShow from "../NoAvailableToShow";
import NoHistoryImg from "../../images/noServices.png";
import { ThemeContext } from "../../App";
import axios from "axios";
import { server_url } from "../../serverUrl";
import Linear from "../loaders_folder/Linear";
import { PiEyeThin } from "react-icons/pi";
import BookedDetailsDialog from "./BookedDetailsDialog";
function CustomerHistory() {
  const { userDatas, theme } = useContext(ThemeContext);
  //states
  const [loading, setLoading] = useState(false);
  const [appointedService, setAppointedService] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [isOpen, setOpen] = useState(false);
  //fetching of data
  useEffect(() => {
    const id = userDatas.userData.userAccount;

    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server_url}/appointments/getBookedService/${id}`
        );

        if (response.status === 200) {
          setAppointedService(response.data);

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const setDialogClose = (data) => {
    setOpen(data);
  };
  return (
    <div>
      {
        <BookedDetailsDialog
          isOpen={isOpen}
          setDialogClose={setDialogClose}
          serviceData={serviceData}
        />
      }
      {loading ? (
        <Linear />
      ) : appointedService.length === 0 ? (
        <NoAvailableToShow
          definition={"You don't have history yet"}
          image={NoHistoryImg}
        />
      ) : (
        <div
          className="customer--appoinmentList-C2"
          style={{
            position: "relative",
            padding: "3rem 3rem",
          }}
        >
          <div className="top--content">
            <div className={`title color--${theme}`}>History</div>
          </div>
          <ul className="service--lists">
            {appointedService &&
              appointedService
                .filter((data) => {
                  const currentDate = new Date();
                  const serviceDate = new Date(data.serviceDate);

                  return (
                    (currentDate.getTime() > serviceDate.getTime() &&
                      data.appointmentState === "accepted") ||
                    data.appointmentState === "declined"
                  );
                })
                .map((service, index) => (
                  <li className={`list--${theme}`} key={index}>
                    <div className="details--container">
                      <div className="details">
                        <img
                          src={service.serviceImage}
                          alt="service image"
                          style={{
                            width: "100px",
                            borderRadius: "10px",
                          }}
                        />
                        <div className="service--details">
                          <p className={`color--${theme}`}>
                            <span
                              style={{
                                fontFamily: "semi-bold",
                              }}
                            >
                              Appointed service:
                            </span>
                            {"  " + service.serviceName}
                          </p>
                          <p className={`color--${theme}`}>
                            <span
                              style={{
                                fontFamily: "semi-bold",
                              }}
                            >
                              Description:
                            </span>
                            {"  " + service.serviceDescription}
                          </p>
                          <p>
                            <span
                              className={`color--${theme}`}
                              style={{
                                fontFamily: "semi-bold",
                              }}
                            >
                              Price:
                            </span>
                            <span style={{ color: "#C9B81A" }}>
                              {"   $" + service.servicePrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={`icon color--${theme}`}>
                        <PiEyeThin
                          onClick={() => {
                            setServiceData(service);
                            setOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerHistory;
