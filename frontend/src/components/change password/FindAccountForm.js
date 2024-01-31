import React, { useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";
import { server_url } from "../../serverUrl";

function FindAccountForm({
  errors,
  btnState,
  handleSendEmail,
  validateOTP,
  currentAuth,
  handleSubmit,
  control,
  setCurrentAuth,
  setUserID,
}) {
  const [suppliedOTP, setSuppliedOtp] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  // to check the supplied email
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${server_url}/auth/accountCheck`, {
        email: data.email,
      });

      if (response.status === 200) {
        if (response.data.exist === true) {
          handleSendEmail();
          setCurrentAuth("submitBtn");
          setUserID(response.data);
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

  return (
    <div>
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
    </div>
  );
}

export default FindAccountForm;
