import React from "react";
import "../scss/style.css";
import logo from "../images/registration-form-img.jpg";

function OpenLoader() {
  return (
    <div
      style={{
        backgroundColor: "pink",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div className="logo--floating">
          <img src={logo} alt="logo" className="logo--float" />{" "}
        </div>
        <h1 className="cssanimation leMagnify sequence">Glamour Ease</h1>
      </div>
    </div>
  );
}

export default OpenLoader;
