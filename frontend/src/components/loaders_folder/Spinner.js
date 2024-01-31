import React from "react";
import "./../../styles/spinner.css";

function Spinner() {
  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        placeItems: "center",
      }}
    >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
