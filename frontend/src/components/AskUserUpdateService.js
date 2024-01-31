import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ThemeContext } from "../App";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { server_url } from "../serverUrl";
import { useSnackbar } from "notistack";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Linear from "./loaders_folder/Linear";
import LoginSpinner from "./loaders_folder/LoginSpinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//schema
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
function AskUserUpdateService({
  dialogTitle,
  serviceIndex,
  serviceID,
  serviceInfo,
  getUpdatedData,
  dialogUpdateOption,
  setDialogUpdateOption,
}) {
  //states
  const { theme, providerDatas } = useContext(ThemeContext);
  const [serviceData, setServiceData] = useState([]);
  const [serviceImage, setserviceImage] = useState(null);
  const [functionDone, setFuctionDone] = useState(false);
  const [serviceTime, setServicetime] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [timeAndDate, setTimeAndDate] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDateTime, setopenDateTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formdata, setFormdata] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //control from yup to validate form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchNewData = () => {
    try {
      setLoading(true);
      setServiceData(
        [...providerDatas.providerData.services].reverse()[serviceIndex]
      );
      const providerID = providerDatas.providerData._id;

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server_url}/provider/getProvider/${providerID}`
          );
          setTimeAndDate(
            [...response.data.provider.services].reverse()[serviceIndex]
              .timeAndDate
          );
          console.log(
            [...response.data.provider.services].reverse()[serviceIndex]
          );
          setServiceData(
            [...response.data.provider.services].reverse()[serviceIndex]
          );

          if (response.status === 200) {
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchNewDataForService = () => {
    try {
      setLoading(true);
      setServiceData(
        [...providerDatas.providerData.services].reverse()[serviceIndex]
      );
      const providerID = providerDatas.providerData._id;

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${server_url}/provider/getProvider/${providerID}`
          );
          setTimeAndDate(
            [...response.data.provider.services].reverse()[serviceIndex]
              .timeAndDate
          );
          console.log(
            [...response.data.provider.services].reverse()[serviceIndex]
          );
          setServiceData(
            [...response.data.provider.services].reverse()[serviceIndex]
          );

          if (response.status === 200) {
            updateFormValues();
            openDetailsDialog();
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    try {
      setTimeAndDate(
        providerDatas.providerData.services[serviceIndex].timeAndDate
      );
      setServiceData(
        [...providerDatas.providerData.services].reverse()[serviceIndex]
      );

      // Reset the form with default values after the asynchronous calls
      const defaultValues = {
        serviceName: serviceInfo.service_name,
        servicePrice: serviceInfo.serviceData_price,
        serviceDescription: [...providerDatas.providerData.services].reverse()[
          serviceIndex
        ].service_description,
      };
      reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
  }, [serviceIndex, providerDatas.providerData.services, reset]);

  const updateFormValues = () => {
    // Reset the form with default values after the asynchronous calls
    const defaultValues = {
      serviceName: serviceInfo.service_name,
      servicePrice: serviceInfo.service_price,
      serviceDescription: serviceInfo.service_description,
    };
    reset(defaultValues);
  };
  //to close the dialog
  const handleClose = () => {
    setDialogUpdateOption(false);
    setOpenDetails(false);
    setopenDateTime(false);
  };
  //to handle the image file
  const preset_key = "qlg1jfrx";
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("upload_preset", preset_key);
    setFormdata(newFormData);

    setserviceImage(URL.createObjectURL(file));
  };

  //put request to update service in the database
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let cloudinaryResponse;

      if (formdata.get("file")) {
        // If the user has uploaded a new image, upload it to Cloudinary
        cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dylj1p7lj/image/upload",
          formdata
        );
      }

      const updatePayload = {
        service_name: data.serviceName,
        service_price: data.servicePrice,
        service_description: data.serviceDescription,
      };

      //include the image if user added that
      if (cloudinaryResponse && cloudinaryResponse.data.secure_url) {
        updatePayload.service_image = cloudinaryResponse.data.secure_url;
      }
      const providerID = providerDatas.providerData._id;

      // Send the update request
      const response = await axios.put(
        `${server_url}/provider/updateServiceInfo/${providerID}/${serviceID}`,
        {
          updatedDetails: updatePayload,
        }
      );

      if (response.status === 200) {
        enqueueSnackbar("Service Updated successfully", { variant: "success" });
        handleClose();
        getUpdatedData();

        if (cloudinaryResponse) {
          setserviceImage(null);
        }
      } else {
        enqueueSnackbar("Failed occurred, please try again", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const openDetailsDialog = () => {
    setOpenDetails(true);
  };
  const openTimeDateDialog = () => {
    setopenDateTime(true);
  };
  const handleDateDelete = (dateId) => {
    const deleteDate = async () => {
      try {
        const response = await axios.delete(
          `${server_url}/provider/services/${providerDatas.providerData._id}/dates/${dateId}`
        );

        if (response.status === 200 || response.status === 201) {
          enqueueSnackbar("Succesfuly deleted", { variant: "info" });
        }
        handleClose();
      } catch (error) {
        console.error("Error deleting date:", error.message);
      }
    };

    deleteDate();
  };

  return (
    <>
      {loading && <LoginSpinner />}
      <Dialog
        open={dialogUpdateOption}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Please select item you wish to update</DialogTitle>

        <DialogContent>
          <button
            onClick={() => {
              fetchNewDataForService();
            }}
          >
            Service details
          </button>
          <button
            onClick={() => {
              openTimeDateDialog();
              fetchNewData();
            }}
          >
            Time and Date
          </button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className="dialog--container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginTop: ".5rem" }}>
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
              <img
                src={
                  serviceImage
                    ? serviceImage
                    : serviceData?.service_image
                    ? serviceData.service_image
                    : "https://th.bing.com/th/id/OIP.6kEev2FT9fMgGqWhNJSfPgHaE6?w=252&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                }
                alt="service image"
                width="100%"
              />

              <input type="file" onChange={handleFileChange} />
            </div>
            <button className="simple--fadein--btn" type="submit">
              Update
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDateTime}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Remove specific date and time</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please note that by clicking an item you wish to remove it from the
            list
          </DialogContentText>
          <div>
            <h4>
              Date:
              {timeAndDate.map((data, i) => (
                <div
                  className="title"
                  key={i}
                  onClick={() => handleDateDelete(data._id)}
                >
                  {data.service_date}
                  <ul>
                    {data.availability_time.map((time, j) => (
                      <li key={j}>{time}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </h4>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AskUserUpdateService;
