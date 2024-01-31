import React, { useState, useEffect, useContext } from "react";
import Spinner from "../loaders_folder/Spinner";
import { BsHouseDoor, BsJournalText, BsPersonCircle } from "react-icons/bs";
import { IoBookOutline, IoNotificationsOutline } from "react-icons/io5";
import "../../scss/style.css";
import { FiHome } from "react-icons/fi";
import { CiHome } from "react-icons/ci";
import AppointmentList from "./AppointmentList";
import CustomerProfile from "./CustomerProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import CustomerHistory from "./CustomerHistory";
import CustomerNotification from "./CustomerNotification";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../../App";
import { IoIosArrowForward, IoMdDesktop } from "react-icons/io";
import ThemeChanger from "./ThemeChanger";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server_url } from "../../serverUrl";
import Slide from "@mui/material/Slide";
import HorizontalLinearStepper from "../Bookingpage/Stepper";
import useProfileinfoStore from "../store/useProfileinfoStore";
import { DialogTitle, DialogContent } from "@mui/material";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HomeCustomer(props) {
  const { theme, customerProfiles } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState({});
  const [customerProfile, setCustomerProfile] = useState({});
  const [openSignout, setOpenSignout] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [notificationList, setNotification] = useState([]);
  const { profilePicture, setProfilepicture } = useProfileinfoStore();
  const navigate = useNavigate();

  console.log("profile picture is ", profilePicture);

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

  useEffect(() => {
    const fetchNotif = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${server_url}/notification/getNotification/${customerProfiles.customerProfile._id}`
        );

        if (response.status === 200) {
          setNotification(response.data.res.reverse());
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (customerProfiles.customerProfile._id) {
      fetchNotif();
    }
  }, []);
  console.log(notificationList.length);
  useEffect(() => {
    setLoading(true);

    if (props.sharedData && props.profile) {
      setData(props.sharedData);

      setCustomerProfile(props.profile);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setData(user.displayName);
        }
      });

      return () => unsubscribe();
    }
  }, [props.sharedData]);

  const handleNextPage = (page) => {
    setCurrentPage(page);
  };

  //to signed out the user
  const Signout = async () => {
    setOpenSignout(true);
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const closeDialog = () => {
    setOpenSignout(false);
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
              <div className="flex justify--content--c gap-5 boxShadow--bottom padding-5 poppins-bold">
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
                {!isDesktop && <Icon icon="solar:home-2-linear" />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-5">
                      <Icon
                        icon="solar:home-2-linear"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p className="fs-10 "> Home</p>
                    </div>
                    <IoIosArrowForward size={15} />
                  </div>
                )}
              </li>
              <li
                style={
                  isDesktop
                    ? currentPage === "book"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "book"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("book");
                }}
              >
                {!isDesktop && <IoBookOutline />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-5">
                      <IoBookOutline size={20} />

                      <p className="fs-10 ">Book</p>
                    </div>
                    <IoIosArrowForward size={15} />
                  </div>
                )}
              </li>
              <li
                style={
                  isDesktop
                    ? currentPage === "history"
                      ? { color: "#FF9A9C", borderRight: "2px solid #FF9A9C" }
                      : { color: "gray" }
                    : currentPage === "history"
                    ? { color: "#191444" }
                    : { color: "white" }
                }
                onClick={() => {
                  setCurrentPage("history");
                }}
              >
                {!isDesktop && <BsJournalText />}

                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-5">
                      <BsJournalText size={20} />
                      <p className="fs-10 ">History</p>
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
                {!isDesktop && <IoNotificationsOutline />}
                {isDesktop && (
                  <div className="flex justify--content--spacebet padding-10">
                    <div className="flex justify--content--s gap-5">
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
                    <div className="flex justify--content--s gap-5">
                      <BsPersonCircle size={20} />
                      <p className="fs-10 ">Profile</p>
                    </div>
                    <IoIosArrowForward size={15} />
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
                  paddingLeft: "1rem",
                  cursor: "pointer",
                }}
              >
                <ThemeChanger />
                <p className={`color--${theme} fs-10`}>{theme}</p>
              </div>
            )}

            {isDesktop && (
              <div
                className={`gap-25 color--${theme} `}
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
                      ? profilePicture //profile picture
                      : "https://www.bing.com/th/id/OGC.26ef8bb418031b9bb4f44e1aeea71186?pid=1.7&rurl=https%3a%2f%2fwww.icegif.com%2fwp-content%2fuploads%2floading-icegif-1.gif&ehk=2Acslneog3bqjvPC44LDJtLzNjNxDqIk3NXCrSRZM%2fA%3d"
                  }
                  onClick={() => setCurrentPage("profile")}
                  alt="profile picture"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    borderRadius: "100%",
                    boxShadow: "5px 5px  15px rgba(,0,0,0,0.2)",
                  }}
                />
                <div
                  className={
                    notificationList.length === 0
                      ? `no-notification`
                      : `notification--bell`
                  }
                >
                  <IoNotificationsOutline
                    size={20}
                    className={`color--${theme}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentPage("notification")}
                  />
                </div>
              </div>
              <div className={`main--content--${theme}`}>
                {(() => {
                  switch (currentPage) {
                    case "home":
                      return (
                        <AppointmentList
                          data={props.sharedData}
                          handleNextPage={handleNextPage}
                        />
                      );
                    case "history":
                      return <CustomerHistory />;
                    case "book":
                      return (
                        <HorizontalLinearStepper
                          handleNextPage={handleNextPage}
                        />
                      );
                    case "profile":
                      return (
                        <CustomerProfile
                          data={props.sharedData}
                          profile={customerProfile}
                        />
                      );
                    case "notification":
                      return <CustomerNotification />;
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
                    return (
                      <AppointmentList
                        data={props.sharedData}
                        handleNextPage={handleNextPage}
                      />
                    );
                  case "book":
                    return <HorizontalLinearStepper />;
                  case "history":
                    return <CustomerHistory />;
                  case "profile":
                    return (
                      <CustomerProfile
                        data={props.sharedData}
                        profile={customerProfile}
                      />
                    );
                  case "notification":
                    return <CustomerNotification />;
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

export default HomeCustomer;
