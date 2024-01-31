import React, { useContext, useEffect } from "react";
import { PiEyeThin } from "react-icons/pi";
import useAppointmentStore from "../store/useAppointmentStore";
import { ThemeContext } from "../../App";
import useBookingPageClass from "../store/useBookingPageClass";
import NoAvailableToShow from "../NoAvailableToShow";
import img from "../../images/noServices.png";

function SelectService({ setStep }) {
  const { services, setChosenService, chosenService, branch, setServiceID } =
    useAppointmentStore();
  const { theme } = useContext(ThemeContext);
  const { currentClassname, setCurrentClassname } = useBookingPageClass();
  const handleClick = (service, id) => {
    setChosenService(service);
    setServiceID(id);
    setStep(3);
    setCurrentClassname("classname--rightslide");
  };

  return (
    <div className={currentClassname}>
      <ul className="service--lists service--list">
        <div className={`mb--municipality`}>
          <h4 className={`title color--${theme} municipality--page--title`}>
            Select Service
          </h4>
          <p style={{ margin: "0", marginBottom: "2rem", color: "gray" }}>
            Please select a service.
          </p>
          {/* <input
          type="text"
          placeholder="search..."
          value={municipality}
          onChange={(e) => setCurrentMunicipality(e.target.value)}
        /> */}
        </div>
        {console.log(branch)}

        {services.length <= 0 ? (
          <NoAvailableToShow
            definition={`This branch ${branch} has not yet begun providing services.`}
            image={img}
          />
        ) : (
          services &&
          services.reverse().map((service, index) => (
            <li
              className={`list--${theme} available--service`}
              key={index}
              onClick={() => handleClick(service, service._id)}
            >
              <div className="details--container">
                <div className="details">
                  <img
                    src={service.service_image}
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
                        Service name:
                      </span>
                      {"  " + service.service_name}
                    </p>
                    <p className={`color--${theme}`}>
                      <span
                        style={{
                          fontFamily: "semi-bold",
                        }}
                      >
                        Service description:
                      </span>
                      {"  " + service.service_description}
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
                        {"   ₱" + service.service_price}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={`icon color--${theme}`}>
                  <PiEyeThin />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SelectService;
