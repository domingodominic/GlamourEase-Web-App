import React, { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { ThemeContext } from "../../App";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ResetPassword({ isDialogOpen, setDialogOpen, email }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { providerDatas, userDatas } = useContext(ThemeContext);
  const closeDialog = () => {
    setDialogOpen(false);
  };

  const changePassword = async () => {
    sendPasswordResetEmail(auth, email).then(() => {
      enqueueSnackbar("We have sent the reset password in your email", {
        variant: "info",
      });
      navigate("/login");
    });
    await signOut(auth);
  };
  return (
    <>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        onClose={closeDialog}
      >
        <DialogTitle>Change Password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By initiating a password change, you will be automatically logged
            out and receive an email for reseting your password as part of the
            process. Are you certain you wish to proceed with changing your
            password?
          </DialogContentText>
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
            <button
              style={{
                background: "#ff9a9c",
                border: "none",
                color: "white",
                padding: "3px 5px",
                borderRadius: "3px",
              }}
              onClick={() => changePassword()}
            >
              Proceed
            </button>
            <button onClick={() => closeDialog()}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResetPassword;
