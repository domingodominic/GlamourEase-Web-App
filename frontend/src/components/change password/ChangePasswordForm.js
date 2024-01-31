import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { DialogTitle } from "@mui/material";
import EmailLoader from "../loaders_folder/EmailLoader";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { server_url } from "../../serverUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//component
function ChangePasswordForm({ forgotPassword, handleForgotPassOpen, userID }) {
  const { enqueueSnackbar } = useSnackbar();

  const closeDialog = () => {
    handleForgotPassOpen(false);
  };

  const onChangePassword = async (data) => {
    const authObject = auth;
    const user = authObject.currentUser;

    if (user) {
      try {
        console.log(user.updatePassword(data.newPassword));
        await user.updatePassword(data.newPassword);
        const response = await axios.put(
          `${server_url}/auth/changePassword/${userID}`,
          {
            newPassword: data.newPassword,
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
    } else {
      console.log("User is not suthenticated");
    }
  };

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
    resolver: yupResolver(schemaForPassword),
  });

  return (
    <>
      <Dialog
        open={forgotPassword}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By changing your password you must at least enter 8 digits
          </DialogContentText>
          <form onSubmit={handleSubmit(onChangePassword)}>
            <div style={{ marginTop: ".5rem" }}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    variant="outlined"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
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
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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
            <button type="submit" className="join--btn">
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChangePasswordForm;
