import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useSnackbar } from "notistack";
import "../../scss/style.css";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { server_url } from "../../serverUrl";

// const bcrypt = require("bcrypt");
const defaultProfile =
  "https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png";
const role = "provider";
const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .typeError("Age must be a valid number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required")
    .test("is-required", "Age is required", function (value) {
      return value !== undefined && value !== null && value !== "";
    }),
  birthdate: yup
    .string()

    .required("Birthdate is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  municipality: yup.string().required("Municipality is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contactNumber: yup.number().required("contact number is required"),
  business_email: yup
    .string()
    .email("Invalid Email")
    .required("Business email is required"),
  business_address: yup.string().required("Business address is required"),
  business_description: yup
    .string()
    .required("Business description is required"),
  business_name: yup.string().required("Business name is required"),
});

function ProviderSignup() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.table(data);
    try {
      setLoading(true);

      const response = await axios.post(`${server_url}/provider/signup/`, {
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        birthdate: data.birthdate,
        password: data.password,
        municipality: data.municipality,
        email: data.email,
        contactNumber: data.contactNumber,
        profilePicture: defaultProfile,
        businessDescription: data.business_description,
        businessEmail: data.business_email,
        businessName: data.business_name,
        businessAddress: data.business_address,
        role: role,
      });

      if (response.status === 201) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        enqueueSnackbar("Sign up successful", { variant: "success" });
      } else {
        enqueueSnackbar("Sign up failed", { variant: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container--body">
      {loading && <LoginSpinner />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="login--body"
      >
        <Card className="signup--card">
          <h2 style={{ color: "#ff9a9c" }}>Sign up</h2>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="firstname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        error={!!errors.firstname}
                        helperText={
                          errors.firstname ? errors.firstname.message : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="lastname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        error={!!errors.lastname}
                        helperText={
                          errors.lastname ? errors.lastname.message : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        type="password"
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
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
              </div>
              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="age"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Age"
                        variant="outlined"
                        type="number"
                        error={!!errors.age}
                        helperText={errors.age ? errors.age.message : ""}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="input--divider">
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <Controller
                    name="contactNumber"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contact Number"
                        variant="outlined"
                        error={!!errors.contactNumber}
                        helperText={
                          errors.contactNumber
                            ? errors.contactNumber.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Controller
                    name="municipality"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Municipality"
                        variant="outlined"
                        error={!!errors.municipality}
                        helperText={
                          errors.municipality ? errors.municipality.message : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1 }}>
                  <Controller
                    name="birthdate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Birthdate"
                        variant="outlined"
                        type="date"
                        error={!!errors.birthdate}
                        helperText={
                          errors.birthdate ? errors.birthdate.message : ""
                        }
                        InputLabelProps={{ shrink: true }}
                        placeholder=""
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const formattedDate = format(
                            selectedDate,
                            "yyyy-MM-dd"
                          );
                          field.onChange(formattedDate);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1 }}>
                  <Controller
                    name="business_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Business name"
                        variant="outlined"
                        error={!!errors.business_name}
                        helperText={
                          errors.business_name
                            ? errors.business_name.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1 }}>
                  <Controller
                    name="business_description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Business Description"
                        variant="outlined"
                        error={!!errors.business_description}
                        helperText={
                          errors.business_description
                            ? errors.business_description.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1 }}>
                  <Controller
                    name="business_email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Business email"
                        variant="outlined"
                        error={!!errors.business_email}
                        helperText={
                          errors.business_email
                            ? errors.business_email.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="input--divider">
                <div style={{ flex: 1 }}>
                  <Controller
                    name="business_address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Business address"
                        variant="outlined"
                        error={!!errors.business_email}
                        helperText={
                          errors.business_address
                            ? errors.business_address.message
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ff9a9c", // Border color for the default state
                            },
                            "&:hover fieldset": {
                              borderColor: "#fdcfcf", // Border color when hovered
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fdcfcf", // Border color when focused
                            },
                          },
                          "& label.Mui-focused": {
                            color: "#fdcfcf", // Text color when focused
                          },
                          marginBottom: 1,
                          padding: 0.1,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <button className="fadein--btn" type="submit">
                Submit
              </button>

              <p style={{ fontSize: "12px" }}>
                Already have an account?
                <Link
                  to="/login"
                  style={{
                    color: "#ff9a9c",
                    fontSize: "12px",
                    marginLeft: "2px",
                  }}
                >
                  Log In here.
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ProviderSignup;
