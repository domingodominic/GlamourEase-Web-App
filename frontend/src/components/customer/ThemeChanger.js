import React, { useState, useContext } from "react";
import "../../scss/style.css";
import { BiSolidMoon } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";
import { ThemeContext } from "../../App";

function ThemeChanger() {
  const { theme, updateThemeState } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(false);

  const changeTheme = () => {
    let newValue = "";
    if (theme === "light") {
      newValue = "dark";
    } else {
      newValue = "light";
    }

    updateThemeState(newValue);
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  return (
    <div
      className="theme-container"
      onClick={() => {
        changeTheme();
        toggleSwitch();
      }}
    >
      <label className="toggle" htmlFor="switch">
        <input
          id="switch"
          className="input"
          type="checkbox"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <div
          className={`icon icon--${isChecked ? "sun" : "moon"}`}
          style={{ fontSize: "15px" }}
        >
          <BiSolidMoon />
        </div>
        <div
          className={`icon icon--${isChecked ? "moon" : "sun"}`}
          style={{ fontSize: "15px" }}
        >
          <BsSunFill />
        </div>
      </label>
    </div>
  );
}

export default ThemeChanger;
