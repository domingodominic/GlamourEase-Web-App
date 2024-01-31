import React, { useContext, useState, useEffect } from "react";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import { ThemeContext } from "../../App";
import Linear from "../loaders_folder/Linear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import Datepicker from "./Datepicker";
import Timepicker from "./Timepicker";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidChevronDown, BiKey } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddButton from "../AddButton";
import * as yup from "yup";
import "../../scss/style.css";
import axios from "axios";
import useServicesStore from "../store/useServicesStore.js";
import { server_url } from "../../serverUrl";
import { useSnackbar } from "notistack";
import { IoIosAdd } from "react-icons/io";
import Actions from "../Actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup.object().shape({
  serviceName: yup.string().required("Service name is required"),
  serviceDescription: yup.string().required("Service description is required"),
  servicePrice: yup
    .number()
    .typeError("Price must be a valid number")
    .positive("Price must be a positive number")
    .integer("Price must be an integer")
    .required("Price is required"),
});

function ProviderServices() {
  const { theme, customerProfiles, providerDatas } = useContext(ThemeContext);
  const [serviceData, setServiceData] = useState([]);
  const [serviceImage, setserviceImage] = useState(null);
  const [functionDone, setFuctionDone] = useState(false);
  const [serviceTime, setServicetime] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formdata, setFormdata] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const { currentServices, setCurrentServices } = useServicesStore();

  const { enqueueSnackbar } = useSnackbar();
  const dateSelected = (date) => {
    setSelectedDate(date);
  };
  const addTime = (newTime) => {
    setServicetime([...serviceTime, newTime]);
  };
  const removeTime = (index) => {
    const updatedTimeList = [...serviceTime];
    updatedTimeList.splice(index, 1);
    setServicetime(updatedTimeList);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUpdatedData = async () => {
    setLoading(true);
    if (providerDatas.providerData && providerDatas.providerData._id) {
      try {
        const response = await axios.get(
          `${server_url}/provider/${providerDatas.providerData._id}`
        );

        setServiceData(response.data.data.services);
        setCurrentServices(response.data.data.services);

        if (response.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getUpdatedData();
  }, [providerDatas.providerData]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const preset_key = "qlg1jfrx";

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("upload_preset", preset_key);
    setFormdata(newFormData);

    setserviceImage(URL.createObjectURL(file));
  };

  //post request to insert service in the database
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dylj1p7lj/image/upload",
        formdata
      );

      const response = await axios.post(
        `${server_url}/provider/addService/${providerDatas.providerData._id}`,
        {
          service_name: data.serviceName,
          service_price: data.servicePrice,
          service_description: data.serviceDescription,
          service_date: selectedDate,
          availability_time: serviceTime,
          service_image: cloudinaryResponse.data.secure_url,
        }
      );

      if (response.status === 201) {
        enqueueSnackbar("Service Added successful", { variant: "success" });
        getUpdatedData();
        setserviceImage(null);
      } else {
        enqueueSnackbar("Failed occured please try again", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDialog = async (serviceID) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${server_url}/provider/deleteService/${providerDatas.providerData._id}/${serviceID}`
      );

      if (response.status === 200) {
        setLoading(false);
        setFuctionDone(true);
        getUpdatedData();
      }
    } catch (error) {
      console.error("An error occurred while deleting the service:", error);
      setLoading(false);
      setFuctionDone(true);
    }
  };

  return (
    <div>
      {loading ? (
        <Linear />
      ) : (
        <div className="service--header">
          {serviceData ? null : <Linear />}

          {serviceData && serviceData.length <= 0 ? (
            <div
              className="no--services"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4.5rem",
              }}
            >
              <div>
                <img
                  src={require("../../images/think--img.png")}
                  alt="think image"
                  width="200px"
                />
                <p style={{ color: "gray" }}>
                  Seems you haven't set your services
                </p>
                <button className="fadein--btn" onClick={handleClickOpen}>
                  Set now
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{ padding: "0px 60px 0px 60px" }}
              className={`service--item--container`}
            >
              <div className="service--list--header">
                <h4 className={`service--title--header  color--${theme}`}>
                  Service items
                </h4>
                <div onClick={handleClickOpen}>
                  <AddButton />
                </div>
              </div>

              <ul className="service--lists">
                {serviceData &&
                  [...serviceData].reverse().map((service, index) => (
                    <li className={`list--${theme}`} key={index}>
                      <div className="details--container">
                        <div className="details">
                          <img
                            src={service.service_image}
                            alt="service image"
                            style={{ width: "100px", borderRadius: "10px" }}
                          />
                          <div className="service--details">
                            <p className={`color--${theme}`}>
                              <span
                                style={{
                                  fontFamily: "semi-bold",
                                }}
                              >
                                Service name:
                              </span>
                              {"  " + service.service_name}
                            </p>
                            <p className={`color--${theme}`}>
                              <span
                                style={{
                                  fontFamily: "semi-bold",
                                }}
                              >
                                Service description:
                              </span>
                              {"  " + service.service_description}
                            </p>
                            <p>
                              <span
                                className={`color--${theme}`}
                                style={{
                                  fontFamily: "semi-bold",
                                }}
                              >
                                Price:
                              </span>
                              <span style={{ color: "#C9B81A" }}>
                                {"   $" + service.service_price}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className={`icon color--${theme}`}>
                          <Actions
                            serviceData={service}
                            serviceID={service._id}
                            serviceIndex={index}
                            onDelete={handleDeleteDialog}
                            getUpdatedData={getUpdatedData}
                            functionDone={functionDone}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {open ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className="dialog--container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="serviceName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Service name"
                      variant="outlined"
                      error={!!errors.serviceName}
                      helperText={
                        errors.serviceName ? errors.serviceName.message : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#ff9a9c",
                          },
                          "&:hover fieldset": {
                            borderColor: "#fdcfcf",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#fdcfcf",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#fdcfcf",
                        },
                        marginBottom: 1,
                        padding: 0.1,
                        width: "100%",
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="servicePrice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Service price"
                      type="number"
                      error={!!errors.servicePrice}
                      helperText={
                        errors.servicePrice ? errors.servicePrice.message : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#ff9a9c",
                          },
                          "&:hover fieldset": {
                            borderColor: "#fdcfcf",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#fdcfcf",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#fdcfcf",
                        },
                        marginBottom: 1,
                        padding: 0.1,
                        width: "100%",
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="serviceDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Service description"
                      multiline
                      rows={3}
                      error={!!errors.serviceDescription}
                      helperText={
                        errors.serviceDescription
                          ? errors.serviceDescription.message
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#ff9a9c",
                          },
                          "&:hover fieldset": {
                            borderColor: "#fdcfcf",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#fdcfcf",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#fdcfcf",
                        },
                        marginBottom: 1,
                        padding: 0.1,
                        width: "100%",
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      serviceImage
                        ? serviceImage
                        : `https://th.bing.com/th/id/OIP.AuvfA6gcdoIC3Drlq9w75wHaHa?pid=ImgDet&rs=1`
                    }
                    alt="service image"
                    width="200px"
                  />
                </div>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div>
                <h6>Select Date:</h6>
                <div>
                  <Datepicker selectDate={dateSelected} />
                </div>
              </div>
              <div>
                <h6>Select Time:</h6>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <Timepicker
                      addTime={addTime}
                      removeTime={removeTime}
                      serviceTime={serviceTime}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button className="simple--fadein--btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

export default ProviderServices;
