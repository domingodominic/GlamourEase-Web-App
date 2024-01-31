import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { IoIosArrowForward } from "react-icons/io";
import useAppointmentStore from "../store/useAppointmentStore";
import "../../scss/style.css";
import useBookingPageClass from "../store/useBookingPageClass";
const municipalityList = [
  "Dinalupihan",
  "Balanga",
  "Hermosa",
  "Orani",
  "Orion",
];

function SelectMunicipality({ setStep }) {
  const { theme, userDatas } = useContext(ThemeContext);
  const { setMunicipality } = useAppointmentStore();
  const { currentClassname, setCurrentClassname } = useBookingPageClass();
  const [municipality, setCurrentMunicipality] = useState("");

  return (
    <div className={currentClassname}>
      <div className={`mb--municipality`}>
        <h4 className={`title color--${theme} municipality--page--title`}>
          Select Municipality
        </h4>
        <p style={{ margin: "0", marginBottom: "2rem", color: "gray" }}>
          Please select a municipality.{" "}
        </p>
        {/* <input
          type="text"
          placeholder="search..."
          value={municipality}
          onChange={(e) => setCurrentMunicipality(e.target.value)}
        /> */}
      </div>

      {municipalityList
        .filter((city) => {
          return city.toLowerCase().indexOf(municipality.toLowerCase()) >= 0;
        })
        .map((item, i) => (
          <ul className="service--lists" key={i}>
            <li
              className={`list--${theme} municipality--list`}
              onClick={() => {
                setMunicipality(item);
                setStep(1);
                setCurrentClassname("classname--rightslide");
              }}
            >
              <div className="details--container">
                <h4 className={`color--${theme}`}> {item}</h4>
                <div className={`color--${theme}`}>
                  <IoIosArrowForward />
                </div>
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
}

export default SelectMunicipality;
