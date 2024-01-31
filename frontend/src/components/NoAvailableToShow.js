import React from "react";

function NoAvailableToShow({ definition, image }) {
  return (
    <div>
      <div
        className="no--services"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <div>
          <img src={image} alt="no history found" width="250px" />
          <p style={{ color: "gray", margin: "0" }}>{definition}</p>
        </div>
      </div>
    </div>
  );
}

export default NoAvailableToShow;
