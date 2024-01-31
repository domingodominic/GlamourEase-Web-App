import React from "react";
import "../../scss/style.css";

function LoginSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: "0",
        left: "0",
        background: "#0000003b",
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

export default LoginSpinner;
