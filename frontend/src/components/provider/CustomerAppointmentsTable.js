import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Linear from "../loaders_folder/Linear";
import { server_url } from "../../serverUrl";
import { ThemeContext } from "../../App";
import NoAvailableToShow from "../NoAvailableToShow";
import img from "../../images/noappointment.png";
import { GoPeople } from "react-icons/go";
import Actions from "../Actions";
import { BsEnvelopeAt, BsPersonCheckFill, BsPersonFillX } from "react-icons/bs";
import EmailLoader from "../loaders_folder/EmailLoader";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { Tooltip } from "@mui/material";

export default function DataTable() {
  const [customerData, setCustomerData] = React.useState({});
  const [customerID, setCustomerID] = React.useState("");
  const [serviceData, setServiceData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loadingEmail, setLoadingEmail] = React.useState(false);
  const { providerDatas, theme } = React.useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date().getDate();

  const columns = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },

    {
      field: "serviceName",
      headerName: "Selected Service",
      width: 180,
    },
    {
      field: "servicePrice",
      headerName: "Price",
      width: 90,
    },
    {
      field: "serviceDate",
      headerName: "Date",
      width: 130,
    },
    {
      field: "serviceTime",
      headerName: "Time",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <div>
          {today <= new Date(params.row.serviceDate).getDate() &&
            params.row.appointmentState === "accepted" && (
              <button
                onClick={() => handleEmail(params.row)}
                className="flex justify--content--c gap-3"
                style={{
                  border: "none",
                  color: "white",
                  backgroundColor: "#00a6ff",
                  borderRadius: "5px",
                }}
              >
                <p
                  style={{ margin: "0", padding: "5px 5px", cursor: "pointer" }}
                >
                  remind
                </p>
                <BsEnvelopeAt />
              </button>
            )}
          {/* {console.log(
            today < new Date(params.row.serviceDate).getDate() &&
              params.row.appointmentState === "pending"
          )} */}
          {/* {console.log(params.row.appointmentState === "pending")} */}
          {console.log(today < new Date(params.row.serviceDate).getDate())}

          {today <= new Date(params.row.serviceDate).getDate() &&
            params.row.appointmentState === "pending" && (
              <div className="flex justify--content--c">
                <Tooltip title="accept ?" placement="top-start">
                  <div
                    style={{
                      padding: "10px 5px ",
                      color: "green",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleAppointmentState(params.row.id, "accepted")
                    }
                  >
                    <BsPersonCheckFill />
                  </div>
                </Tooltip>
                <Tooltip title="Decline ?" placement="top-start">
                  <div
                    style={{
                      padding: "10px 5px ",
                      color: "red",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleAppointmentState(params.row.id, "decline")
                    }
                  >
                    <BsPersonFillX />
                  </div>
                </Tooltip>
              </div>
            )}
        </div>
      ),
    },
  ];

  const handleEmail = async (row) => {
    const toEmail = row.email;
    const subject = "Appointments reminder";
    const message = `
    Dear ${row.firstname},
  
  We hope this message finds you well. This is a gentle reminder of your upcoming appointment with us.
  
    Appointment Details:
    - Service: ${row.serviceName}
    - Price: ${row.servicePrice}
    - Date: ${row.serviceDate}
    - Time: ${row.serviceTime}
  
    If you have any questions, please feel free to contact us on email. We appreciate your business and look forward to serving you.
  
    Thank you
    `;

    try {
      setLoadingEmail(true);
      const response = await axios.post(`${server_url}/sendEmail`, {
        toEmail,
        subject,
        message,
      });

      if (response.status === 200) {
        setLoadingEmail(false);
        enqueueSnackbar("Email sent successfuly", { variant: "info" });
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  const handleAppointmentState = async (id, status) => {
    try {
      setLoading(true);
      const approve = await axios.put(
        `${server_url}/appointments/approveAppointments/${id}`,
        {
          status,
        }
      );

      console.log(approve.data);
      if (approve.status === 200) {
        setLoading(false);
        fetchService();
        enqueueSnackbar("You have successfuly accept customer appointments!", {
          variant: "info",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ID = providerDatas.providerData._id;

  const fetchService = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${server_url}/appointments/getCustomers?id=${ID}`
      );
      const serviceData = response.data;

      // Assuming serviceData is an array of service records
      const customerDataPromises = serviceData.map(async (service) => {
        try {
          const customerResponse = await axios.get(
            `${server_url}/appointments/getCustomersInfo?id=${service.customerID}`
          );

          return customerResponse.data[0]; // Access the first item in the array
        } catch (error) {
          setLoading(false);
          console.error("Error fetching customer data:", error);
          return {};
        }
      });

      const customerDataArray = await Promise.all(customerDataPromises);

      // Combine service data with customer data and add status based on date
      const currentDate = new Date();
      const combinedData = serviceData.map((service, index) => {
        const customerData = customerDataArray[index];
        const serviceDate = new Date(service.serviceDate);

        // Check if the service date is today
        const isToday =
          serviceDate.toDateString() === currentDate.toDateString();
        const passDate = serviceDate.getDate() < currentDate.getDate();

        return {
          ...service,
          ...customerData,
          serviceDate: serviceDate.toDateString(),
          id: service._id || index.toString(),
          action: <p>Delete</p>,
          status: isToday ? "Today" : passDate ? "History" : "Upcoming",
        };
      });
      console.log("service data ", serviceData);

      setServiceData(combinedData.reverse());

      if (serviceData.length > 0) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  React.useEffect(() => {
    fetchService();
  }, [ID]);

  return (
    <>
      {loadingEmail && <EmailLoader />}
      {loading ? (
        <Linear />
      ) : serviceData && serviceData.length > 0 ? (
        <div className="scheduled--customerList--PP">
          <>
            <div className="flex justify--content--s">
              <div
                className="flex justify--content--c gap-5"
                style={{
                  textAlign: "end",
                  marginTop: "0px",
                  padding: "10px 5px",
                  backgroundColor: "#ff9a9c",
                  color: "white",
                }}
              >
                <h5
                  style={{
                    textAlign: "end",
                    margin: "0px",
                  }}
                >
                  Scheduled Customers
                </h5>
                <GoPeople />
              </div>
            </div>

            <DataGrid
              rows={serviceData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </>
        </div>
      ) : (
        <NoAvailableToShow
          definition={"You don't have customers yet."}
          image={img}
        />
      )}
    </>
  );
}
