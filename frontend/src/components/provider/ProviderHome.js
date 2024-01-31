import React, { useState, useEffect, useContext } from "react";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import "../../scss/style.css";
import NoHistory from "../NoAvailableToShow";
import ProviderProfile from "./ProviderProfile";
import ProviderServices from "./ProviderServices";
import { ThemeContext } from "../../App";
import ProviderNotification from "./ProviderNotification";
import ProviderAppointment from "./ProviderAppointment";
import { BsBook } from "react-icons/bs";
import ThemeChanger from "../customer/ThemeChanger";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from ".././../firebase-config";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { DialogTitle, DialogContent } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import HorizontalLinearStepper from "../Bookingpage/Stepper";
import useProfileinfoStore from "../store/useProfileinfoStore";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProviderHome() {
  const { theme, providerDatas, customerProfiles } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  const [openSignout, setOpenSignout] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [isDesktop, setIsDesktop] = useState(false);
  const { profilePicture } = useProfileinfoStore();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const setNewPage = (page) => {
    setCurrentPage(page);
  };
  const getTimePeriod = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const Signout = async () => {
    setOpenSignout(true);
  };
  const closeDialog = () => {
    setOpenSignout(false);
  };
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div>
      <div className="main--customer--page">
        {!isDesktop && (
          <div className="header--logo">
            <div className="logo--img">
              <img src={require("../../images/logo3.png")} alt="logo png" />
            </div>
            <div className="location--name">
              <p className="logo--name">Glamour Ease</p>
              <p className="location">Bataan, Philippines</p>
            </div>
          </div>
        )}

        <div className="content--conatiner">
          <div className={`home--menu hm--desktop--${theme}`}>
            {isDesktop && (
              <div className="flex justify--content--c gap-5 boxShadow--bottom padding-5 poppins-bold header--logo--container">
                <div className="logo--img">
                  <img
                    src={require("../../images/logo3.png")}
                    alt="logo png"
                    width={40}
                  />
                </div>
                <p className={` italic logoname--desktop--${theme}`}>
                  GlamourEase
                </p>
              </div>
            )}
            <ul>
              <li
                style={
                  isDesktop
                    ? currentPage === "home"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "home"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("home");
                }}
              >
                {!isDesktop && <BsHouseDoor />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-7">
                      <BsHouseDoor size={20} />
                      <p className="fs-10 ">Home</p>
                    </div>
                    <IoIosArrowForward size={15} />
                  </div>
                )}
              </li>
              <li
                style={
                  isDesktop
                    ? currentPage === "appointment"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "appointment"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("appointment");
                }}
              >
                {!isDesktop && <BsBook />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-7">
                      <BsBook size={20} />
                      <p className="fs-10 ">customers</p>
                    </div>
                    <IoIosArrowForward size={15} />
                  </div>
                )}
              </li>
              <li
                style={
                  isDesktop
                    ? currentPage === "notification"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "notification"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("notification");
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    fontSize: "10px",
                    fontWeight: "bolder",
                  }}
                ></span>
                {!isDesktop && <IoNotificationsOutline />}

                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-7">
                      <IoNotificationsOutline size={20} />
                      <p className="fs-10 ">Notification</p>
                    </div>
                    <IoIosArrowForward size={15} />
                  </div>
                )}
              </li>
              <li
                style={
                  isDesktop
                    ? currentPage === "profile"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "profile"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("profile");
                }}
              >
                {!isDesktop && <BsPersonCircle />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-7">
                      <BsPersonCircle size={20} />
                      <p className="fs-10 ">Profile</p>
                    </div>
                    <IoIosArrowForward
                      size={15}
                      className="flex"
                      style={{ justifyContent: "end" }}
                    />
                  </div>
                )}
              </li>
            </ul>
            {isDesktop && (
              <div
                className="flex gap-7 justify--content--s"
                style={{
                  position: "absolute",
                  bottom: "10%",
                  paddingLeft: ".8rem",
                  cursor: "pointer",
                }}
              >
                <ThemeChanger />
                <p className={`color--${theme} fs-10`}>{theme}</p>
              </div>
            )}
            {isDesktop && (
              <div
                className={`gap-25 color--${theme}`}
                style={{
                  position: "absolute",
                  bottom: "5%",
                  display: "flex",
                  paddingLeft: "1rem",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={Signout}
              >
                <CiLogout />
                <span className="fs-10">logout</span>
              </div>
            )}
          </div>
          {isDesktop && (
            <div className={`main--content`}>
              <div className={`header--container--${theme}`}>
                <p className={`header--greet color--${theme}`}>
                  {`Good ` +
                    getTimePeriod() +
                    ", " +
                    customerProfiles.customerProfile.firstname}
                </p>
                <img
                  src={
                    profilePicture
                      ? profilePicture
                      : "https://www.bing.com/th/id/OGC.26ef8bb418031b9bb4f44e1aeea71186?pid=1.7&rurl=https%3a%2f%2fwww.icegif.com%2fwp-content%2fuploads%2floading-icegif-1.gif&ehk=2Acslneog3bqjvPC44LDJtLzNjNxDqIk3NXCrSRZM%2fA%3d"
                  }
                  alt="profile picture"
                  onClick={() => setCurrentPage("profile")}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    boxShadow: "5px 5px  15px rgba(,0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                />
                <IoNotificationsOutline
                  size={20}
                  className={`color--${theme}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentPage("notification")}
                />
              </div>
              <div className={`main--content--${theme}`}>
                {(() => {
                  switch (currentPage) {
                    case "home":
                      return <ProviderServices />;
                    case "appointment":
                      return <ProviderAppointment />;

                    case "profile":
                      return <ProviderProfile />;
                    case "notification":
                      return <ProviderNotification setNewPage={setNewPage} />;
                    default:
                      return <div>Page not found</div>;
                  }
                })()}
              </div>
            </div>
          )}
          {!isDesktop && (
            <div className={`main--content--${theme}`}>
              {(() => {
                switch (currentPage) {
                  case "home":
                    return <ProviderServices />;
                  case "profile":
                    return <ProviderProfile />;
                  case "notification":
                    return <ProviderNotification setNewPage={setNewPage} />;
                  case "appointment":
                    return <ProviderAppointment />;
                  default:
                    return <div>Page not found</div>;
                }
              })()}
            </div>
          )}
        </div>
        {!isDesktop && (
          <div className="customer--footer">
            <p className="footer--name">GlamourEase</p>
            <p className="copyright">
              &copy; Copyright All Rights Reserved, 2023
            </p>
          </div>
        )}
      </div>
      <Dialog
        open={openSignout}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
            <button
              style={{
                background: "#ff9a9c",
                border: "none",
                color: "white",
                padding: "3px 5px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => {
                logout();
              }}
            >
              Log out
            </button>
            <button onClick={closeDialog} style={{ border: "lightgray solid" }}>
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProviderHome;
