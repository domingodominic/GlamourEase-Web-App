import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { DialogTitle } from "@mui/material";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Signout({ openSignout, openSignoutDialog }) {
  const closeDialog = () => {
    openSignoutDialog(false);
  };

  return (
    <>
      <Dialog
        open={openSignout}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to log out?</DialogTitle>

        <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
          <button
            style={{
              background: "#ff9a9c",
              border: "none",
              color: "white",
              padding: "3px 5px",
              borderRadius: "3px",
            }}
            onClick={() => {
              signOut(auth);
              closeDialog();
            }}
          >
            Log out
          </button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </Dialog>
    </>
  );
}

export default Signout;
