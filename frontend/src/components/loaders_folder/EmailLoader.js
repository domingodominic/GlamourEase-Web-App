import { display } from "@mui/system";
import React from "react";
import "../../scss/style.css";
function EmailLoader() {
  return (
    <div
      style={{
        height: "200px",
        width: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="email--loader"></div>
    </div>
  );
}

export default EmailLoader;
