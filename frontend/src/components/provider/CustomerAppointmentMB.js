import React, { useState } from "react";
import axios from "axios";
import Linear from "../loaders_folder/Linear";
import { ThemeContext } from "../../App";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { server_url } from "../../serverUrl";
import NoAvailableToShow from "../NoAvailableToShow";
import img from "../../images/noappointment.png";

function CustomerAppointmentMB() {
  const [customerData, setCustomerData] = React.useState({});
  const [customerID, setCustomerID] = React.useState("");
  const [serviceData, setServiceData] = React.useState({});
  const [loading, setLoading] = useState(false);
  const { providerDatas, theme } = React.useContext(ThemeContext);
  const ID = providerDatas.providerData._id;

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${server_url}/appointments/getCustomers?id=${ID}`
      );
      const serviceData = response.data;

      const customerDataPromises = serviceData.map(async (service) => {
        try {
          const customerResponse = await axios.get(
            `${server_url}/appointments/getCustomersInfo?id=${service.customerID}`
          );
          return customerResponse.data[0];
        } catch (error) {
          console.error("Error fetching customer data:", error);
          return {};
        }
      });

      const customerDataArray = await Promise.all(customerDataPromises);

      const currentDate = new Date();
      const combinedData = serviceData.map((service, index) => {
        const customerData = customerDataArray[index];
        const serviceDate = new Date(service.serviceDate);

        console.log(serviceDate.getTime() < currentDate.getTime());

        const isToday =
          serviceDate.toDateString() === currentDate.toDateString();

        return {
          ...service,
          ...customerData,
          id: service._id || index.toString(),
          status: isToday ? "Today" : "Upcoming", // Add a status based on the date condition
        };
      });
      setLoading(false);
      setServiceData(combinedData);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  React.useEffect(() => {
    fetchService();
  }, [ID]);
  const definition = "You don't have customers yet";
  return (
    <>
      {loading ? (
        <Linear />
      ) : serviceData && serviceData.length > 0 ? (
        <>
          <h4 className={`color--${theme}`} style={{ textAlign: "start" }}>
            Scheduled Customers
          </h4>
          <ul className="customerList--provider--container">
            {serviceData.map((data, i) => (
              <li key={i} className={`customerList--provider--item--${theme}`}>
                <div className="customerList--provider--details">
                  <img
                    src={data.profilePicture}
                    alt="Customer profile picture"
                    style={{ width: "100px", borderRadius: "10px" }}
                  />
                  <div className="customerList--provider--moreDetails">
                    <div className={`flex gap-2`}>
                      <p className={`field--title--${theme}`}>
                        Customer name :{" "}
                      </p>
                      <p
                        className={`color--${theme}`}
                      >{`${data.firstname} ${data.lastname}`}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className={`field--title--${theme}`}>Status: </p>
                      <p className={`color--${theme}`}>{data.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className={`field--title--${theme}`}>Service: </p>
                      <p className={`color--${theme}`}>{data.serviceName}</p>
                    </div>
                  </div>
                </div>
                <IoEyeOutline />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoAvailableToShow definition={definition} image={img} />
      )}
    </>
  );
}
export default CustomerAppointmentMB;
