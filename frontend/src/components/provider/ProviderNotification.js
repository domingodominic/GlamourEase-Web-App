import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../scss/style.css";
import axios from "axios";
import noNotifImg from "../../images/notificationICON.png";
import NoAvailableToShow from "../NoAvailableToShow";
import { ThemeContext } from "../../App";
import { server_url } from "../../serverUrl";
import { useContext } from "react";
import Linear from "../loaders_folder/Linear";

function ProviderNotification({ setNewPage }) {
  const { providerDatas, theme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const definition = "You have no notifications so far";
  const providerID = providerDatas.providerData._id;

  useEffect(() => {
    const fetchNotif = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server_url}/notification/getNotification/${providerID}`
        );

        if (response.status === 200) {
          setNotifications(response.data.res.reverse());
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotif();
  }, []);

  const handleClickedNotif = async (notificationID) => {
    setNewPage("appointment");
    try {
      const response = await axios.put(
        `${server_url}/notification/openNotification/${notificationID}`,
        {
          status: "open",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {loading ? (
        <Linear />
      ) : notifications && notifications.length <= 0 ? (
        <NoAvailableToShow definition={definition} image={noNotifImg} />
      ) : (
        <div>
          <h5 className={`color--${theme}`}>Notifications</h5>
          <ul className={`notification--main--container`}>
            {notifications.map((data, i) => (
              <div className={`notification--list--conatiner--${theme}`}>
                <li key={i} onClick={() => handleClickedNotif(data._id)}>
                  <div className={`notification--content color--${theme}`}>
                    {data.content}
                  </div>
                  <Icon
                    icon="simple-icons:go"
                    className="notification--icon"
                    style={
                      data.status === "unopen"
                        ? { color: "#ff9a9c" }
                        : { color: "gray" }
                    }
                  />
                </li>
                <p>{new Date(data.createdAt).toDateString()}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProviderNotification;
