import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../../scss/style.css";
import styled from "@emotion/styled";

function BookedDetails({ data, closeModal }) {
  return (
    <div className="book--details--container">
      <button
        style={{ position: "absolute", top: "7%", right: "33%" }}
        onClick={() => {
          closeModal(false);
        }}
      >
        CLOSE
      </button>
      <div className="book--details">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={require("../../images/hair.jpg")}
              alt="green iguana"
            />
            <CardContent>
              <div className="item">
                <p>Reference Number</p>
                <h3>RFCAGBXS</h3>
              </div>
              <div className="item">
                <p>Appointed status</p>
                <h3>Upcoming</h3>
              </div>
              <div className="item">
                <p>Selected service</p>
                <h3>{data.appointed_service}</h3>
              </div>
              <div className="item">
                <p>Appointed price</p>
                <h3> ${" " + data.appointed_price}</h3>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default BookedDetails;
