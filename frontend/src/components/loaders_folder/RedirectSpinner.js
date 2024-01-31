import React from "react";
import "../../scss/style.css";

function RedirectSpinner() {
  return (
    <div>
      <div className="redirect--container">
        <div>
          <div className="redirect"></div>
          <p
            style={{
              fontFamily: "semi-bold",
              fontSize: "15px",
              marginTop: "5rem",
              fontStyle: "italic",
              color: "#f08080",
            }}
          >
            Redirecting...
          </p>
        </div>
      </div>
    </div>
  );
}

export default RedirectSpinner;
