import React, { useState, useEffect, useContext } from "react";
import "../../scss/style.css";
import { IoAddCircle } from "react-icons/io5";
import { PiEyeThin } from "react-icons/pi";
import BookedDetails from "./BookedDetails";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";
import HorizontalLinearStepper from "../Bookingpage/Stepper";
import { server_url } from "../../serverUrl";
import axios from "axios";
import BookedDetailsDialog from "./BookedDetailsDialog";
import useBookingPageClass from "../store/useBookingPageClass";
import useAppointmentStore from "../store/useAppointmentStore";

function AppointmentList({ handleNextPage }) {
  const { theme, userDatas } = useContext(ThemeContext);
  const [userAppointmentData, setUserAppointmentData] = useState({});
  const [appointedService, setAppointedService] = useState([]);
  const [serviceData, setServiceData] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentClassname } = useBookingPageClass();
  const [bookIsClicked, setBookClicked] = useState(false);
  const { currentAppointments, setCurrentAppointments } = useAppointmentStore();
  const userId = userDatas.userData.userAccount;

  const setBookState = (data) => {
    setBookClicked(data);
  };
  const goToBookingPage = () => {
    handleNextPage("book");
  };

  //check the date of the appointments every 1min if it is greater than to the current date then change it
  useEffect(() => {
    let intervalId;
    const checkPastAppointments = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${server_url}/appointments/getBookedService/${userId}`
          );

          if (response.status === 200) {
            const currentDate = new Date();

            await Promise.all(
              response.data.map(async (appointment) => {
                if (
                  new Date(appointment.serviceDate).getDate() <=
                    currentDate.getDate() &&
                  !appointment.isRated
                ) {
                  try {
                    await axios.put(
                      `${server_url}/appointments/setToBeRated/${appointment._id}`
                    );
                    console.log(`Marked as toBeRated: ${appointment._id}`);
                  } catch (error) {
                    console.error(
                      `Error marking as toBeRated: ${error.message}`
                    );
                  }
                }
              })
            );
          }
        } catch (error) {
          console.error(`Error fetching appointments: ${error.message}`);
        }
      }
    };

    // Execute the function initially and then every 1 minute
    checkPastAppointments();
    intervalId = setInterval(checkPastAppointments, 30000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [userId]);

  // Fetching data
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${server_url}/appointments/getBookedService/${userId}`
          );

          if (response.status === 200) {
            const currentDate = new Date();

            const filteredAppointments = response.data.filter((data) => {
              const serviceDate = new Date(data.serviceDate);
              return serviceDate.getDate() >= currentDate.getDate();
            });

            setAppointedService(filteredAppointments);
            setCurrentAppointments(filteredAppointments);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId, appointedService.length]);

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
      {appointedService ? null : <Linear />}
      {bookIsClicked ? (
        <HorizontalLinearStepper
          handleNextPage={handleNextPage}
          setBookState={setBookState}
        />
      ) : loading ? (
        <Linear />
      ) : appointedService.length === 0 ? (
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
              src={require("../../images/think--img.png")}
              alt="think image"
              style={{ width: "200px" }}
            />
            <p style={{ color: "gray" }}>
              Seems you don't have active appointments.
            </p>
            <button
              className="fadein--btn"
              onClick={() => {
                setBookClicked(true);
                setCurrentClassname("classname--rightslide");
              }}
            >
              Book now
            </button>
          </div>
        </div>
      ) : (
        <div
          className="customer--appoinmentList-C2"
          style={{
            position: "relative",
            padding: "3rem 3rem",
          }}
        >
          <div className="top--content">
            <div className={`title color--${theme} appointmentList--title`}>
              Appointment List
            </div>

            <div className="button">
              <button
                onClick={() => {
                  goToBookingPage();
                  setCurrentClassname("classname--rightslide");
                }}
              >
                Book more
              </button>
              <IoAddCircle />
            </div>
          </div>
          <ul className="service--lists">
            {currentAppointments &&
              currentAppointments.reverse().map((service, index) => (
                <li className={`list--${theme}`} key={index}>
                  <div className="details--container">
                    <div className="details">
                      <img
                        src={service.serviceImage}
                        alt="service image"
                        style={{ width: "100px", borderRadius: "10px" }}
                      />
                      <div className="service--details">
                        <p className={`color--${theme}`}>
                          <span
                            style={{
                              fontFamily: "semi-bold",
                            }}
                          >
                            Date and Time :
                          </span>
                          {` ` +
                            new Date(service.serviceDate).toDateString() +
                            ` ` +
                            service.serviceTime}
                        </p>
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
                        <p
                          style={
                            service.appointmentState === "pending"
                              ? { color: "gray", fontStyle: "italic" }
                              : service.appointmentState === "accepted"
                              ? { color: "green", fontStyle: "italic" }
                              : { color: "red", fontStyle: "italic" }
                          }
                        >
                          {service.appointmentState}
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

export default AppointmentList;
