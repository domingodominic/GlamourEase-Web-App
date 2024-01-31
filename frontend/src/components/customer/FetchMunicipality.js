import React, { useState } from "react";

import { MdKeyboardArrowRight } from "react-icons/md";

function FetchMunicipality({ data, changePage, selectBranch }) {
  return (
    <div style={{ textAlign: "start", padding: "20px", height: "50%" }}>
      <h2 style={{ margin: "0", fontFamily: "boldest" }}>Municipality</h2>
      <p style={{ fontSize: "13px", color: "gray", margin: "0" }}>
        Please select a municipality where you want to book an appointment
      </p>

      <ul style={{ margin: "0", padding: "5px 30px", marginTop: "1rem" }}>
        {data.map((data, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
              marginBottom: "1rem",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              changePage("branch");
              selectBranch(data._id);
            }}
          >
            <div className="city">
              <h4 style={{ padding: "0", margin: "0" }}>
                {" "}
                {data.municipality}
              </h4>
              <p style={{ fontSize: "13px", color: "gray", margin: "0" }}>
                {data.businessDescription}
              </p>
            </div>
            <div
              className="icon"
              style={{
                color: "#FF9A9C",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdKeyboardArrowRight />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchMunicipality;
