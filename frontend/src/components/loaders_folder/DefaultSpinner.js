import React from "react";
import "../../scss/style.css";

function DefaultSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "9999",
      }}
    >
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default DefaultSpinner;
