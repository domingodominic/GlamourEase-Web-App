import React, { useEffect, useState } from "react";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import DefaultSpinner from "../loaders_folder/DefaultSpinner";
import "../../scss/style.css";
import AppointmentList from "./AppointmentList";
import { color } from "@mui/system";
import { server_url } from "../../serverUrl";
import Branches from "./Branches";
import axios from "axios";
import FetchMunicipality from "./FetchMunicipality";
function BookingPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const selectBranch = (branchData) => {
    setSelectedBranch(branchData);
  };
  try {
    axios.get(`${server_url}/provider`).then((response) => {
      setData(response.data.data);
      setLoading(false);
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="main--customer--page">
        <div className="header--logo">
          <div className="logo--img">
            <img src={require("../../images/logo3.png")} alt="logo png" />
          </div>
          <div className="location--name">
            <p className="logo--name">Glamour Ease</p>
            <p className="location">Bataan, Philippines</p>
          </div>
        </div>
        <div className="content--container--booking">
          <div className="main--content--booking">
            {loading ? (
              <DefaultSpinner />
            ) : currentPage === "home" ? (
              <FetchMunicipality
                data={data}
                changePage={changePage}
                selectBranch={selectBranch}
              />
            ) : (
              <Branches selectBranch={selectedBranch} />
            )}
          </div>
        </div>

        <div className="customer--footer--booking">
          <p className="footer--name">GlamourEase</p>
          <p className="copyright">
            &copy; Copyright All Rights Reserved, 2023
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
