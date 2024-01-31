import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import image from "../../images/registration-form-img.jpg";
import LoginSpinner from "../loaders_folder/LoginSpinner";
import axios from "axios";
import "../../scss/style.css";
import Dialog from "@mui/material/Dialog";
import EmailLoader from "../loaders_folder/EmailLoader";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { server_url } from "../../serverUrl";
import {
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { ThemeContext } from "../../App";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setUserEmail] = useState("");
  const [currentAuth, setCurrentAuth] = useState("findAccount");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoad, setEmailLoad] = useState(false);
  const [userData, setUserData] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [OTP, setOtp] = useState(0);
  const [userID, setUserID] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [suppliedOTP, setSuppliedOtp] = useState("");
  const [btnState, setBtnState] = useState("submitBtn");
  const [forgotpassOpen, setforgotpassOpen] = React.useState(false);
  const [failedAuth, countFailedAuth] = useState(0);
  const [isAllowedChangepass, setChangepasswordStatus] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // to open user roles dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //to close user role dialog
  const handleClose = () => {
    setOpen(false);
  };

  //front end validatoion using yap
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const schemaForPassword = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  // to process the validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, schemaForPassword),
  });

  // to check the supplied email
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${server_url}/auth/accountCheck`, {
        email: data.email,
      });

      if (response.status === 200) {
        console.log(response.data);
        if (response.data.exist === true) {
          setUserID(response.data.accountInfo._id);
          handleSendEmail();
          setCurrentAuth("submitBtn");
        } else {
          enqueueSnackbar(
            "Apologies, but the provided email does not appear to be registered in our system"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFPDialogOpen = () => {
    setforgotpassOpen(true);
  };
  const handleFPDialogClose = () => {
    setforgotpassOpen(false);
  };

  const handleSignin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(`${server_url}/customer/login`, {
        email,
      });

      if (response.status === 200) {
        try {
          const getDataResponse = await axios.get(
            `${server_url}/customer/data?email=${email}`
          );
          setUserData(getDataResponse.data);

          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          // Proceed with any additional actions after successful sign-in

          enqueueSnackbar("Sign in successful", { variant: "success" });
        } catch (error) {
          enqueueSnackbar("Sign in failed", { variant: "error" });
        }
      } else {
        enqueueSnackbar("Sign in failed", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred during sign-in", { variant: "error" });
      countFailedAuth((count) => count + 1);
    } finally {
      setLoading(false);
    }
  };
  //handle sending an OTP
  const handleSendEmail = async () => {
    setEmailLoad(true);
    const OTP = () => {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const toEmail = "dominicpunladomingo120@gmail.com";
    const subject = "Authentication Code: Your Six-Digit OTP";
    const messageToString = OTP();
    setOtp(messageToString.toString());

    const message =
      "Your One-time Password (OTP) is " + messageToString.toString();
    try {
      const response = await axios.post(`${server_url}/sendEmail`, {
        toEmail,
        subject,
        message,
      });

      if (response.status === 200) {
        enqueueSnackbar("An OTP has been sent to your gmail.", {
          variant: "info",
        });
        setBtnState("submitBtn");
        setEmailLoad(false);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  //handle submitting the supplied OTP of the user

  const validateOTP = () => {
    if (suppliedOTP === OTP) {
      enqueueSnackbar("OTP code is validated.", { variant: "info" });
      setChangepasswordStatus(true);
      setChangepasswordStatus(true);
    } else {
      enqueueSnackbar("OTP code supplied is not match.", { variant: "error" });
      setBtnState("resendBtn");
    }
  };
  const renderFindAccountContent = () => (
    <>
      {currentAuth === "findAccount" ? (
        <DialogContentText id="alert-dialog-slide-description">
          To initiate the account reset process, kindly provide your registered
          email address.
        </DialogContentText>
      ) : (
        <DialogContentText id="alert-dialog-slide-description">
          To proceed, kindly provide the 6-digit One-Time Password (OTP) sent to
          your registered email address. Your cooperation is appreciated.
        </DialogContentText>
      )}

      {currentAuth === "findAccount" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginTop: ".4rem" }}>
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

          <button type="submit">Find my account</button>
        </form>
      ) : (
        <div style={{ marginTop: ".4rem" }}>
          <TextField
            label="One-Time Password (OTP)"
            value={suppliedOTP}
            onChange={(e) => setSuppliedOtp(e.target.value)}
            variant="outlined"
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
          {(() => {
            switch (btnState) {
              case "sendBtn":
                return (
                  <button
                    className="join--btn"
                    onClick={() => handleSendEmail()}
                  >
                    SEND OTP
                  </button>
                );
              case "resendBtn":
                return (
                  <button
                    className="join--btn"
                    onClick={() => handleSendEmail()}
                  >
                    RESEND
                  </button>
                );
              case "submitBtn":
                return (
                  <button className="join--btn" onClick={() => validateOTP()}>
                    SUBMIT
                  </button>
                );
              default:
                return null;
            }
          })()}
        </div>
      )}
    </>
  );

  const onChangePassword = async () => {
    try {
      const response = await axios.put(
        `${server_url}/auth/changePassword/${userID}`,
        {
          newPassword,
        }
      );

      if (response.status === 200) {
        enqueueSnackbar("You have successfully changed your password", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? <LoginSpinner /> : null}

      <div className="container--body">
        <div
          className={`content--container login--bodycd ${
            loading ? "hidden" : ""
          }`}
        >
          <div className="reg--bg">
            <img src={image} alt="salon image woman" />
          </div>
          <div className="form">
            <h2 style={{ color: "#ff9a9c", marginBottom: "3rem" }}>Sign In</h2>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                onChange={(e) => setUserEmail(e.target.value)}
                variant="outlined"
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
                  marginBottom: 2,
                  padding: 0.1,
                  width: "100%",
                }}
              />
            </div>

            <div>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
            </div>
            <div>
              {failedAuth >= 3 ? (
                <p onClick={() => setforgotpassOpen(true)}>Forgot password?</p>
              ) : null}
              <div
                style={{
                  display: "flex",
                  fontSize: "11px",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  onChange={() => setBtnDisabled(!btnDisabled)}
                />
                <p className={`color--${theme}`}>
                  I agree all statements in{" "}
                  <Link to="/" style={{ color: "#ff9a9c" }}>
                    Terms & Conditions
                  </Link>
                </p>
              </div>
              <button
                disabled={btnDisabled}
                style={{ marginBottom: "3rem" }}
                className={btnDisabled === true ? "none" : "fadein--btn"}
                onClick={() => handleSignin()}
              >
                Sign In
              </button>

              <p style={{ fontSize: "12px" }} onClick={handleClickOpen}>
                Don't have an account yet ?
                <Link
                  style={{
                    color: "#ff9a9c",
                    fontSize: "12px",
                    marginLeft: "2px",
                  }}
                >
                  Sign up here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Good day!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Before we proceed with creating your account, would you like to
            specify your role ? &#x1F604;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => navigate("/signup")} className="join--btn">
            Customer
          </button>
          <button
            onClick={() => navigate("/provider--signup")}
            className="join--btn"
          >
            Provider
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={forgotpassOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleFPDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {emailLoad ? (
          <EmailLoader />
        ) : !isAllowedChangepass ? (
          <React.Fragment>
            <DialogTitle>{"Forgot your password?"}</DialogTitle>
            <DialogContent>{renderFindAccountContent()}</DialogContent>
          </React.Fragment>
        ) : null}
      </Dialog>
    </div>
  );
}

export default LoginForm;
