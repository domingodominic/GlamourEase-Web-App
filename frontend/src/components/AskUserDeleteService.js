import React from "react";
import Slide from "@mui/material/Slide";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AskUserDialog({
  dialogTitle,
  actions,
  actionTitle,
  dialogContext,
  dialogState,
  setDialogState,
}) {
  const handleActions = () => {
    if (dialogState) {
      actions.function();
      setDialogState(false); // Close the dialog after the action is performed
    }
  };
  const handleClose = () => {
    setDialogState(false);
  };
  return (
    <>
      <Dialog
        open={dialogState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContext}</DialogContentText>
        </DialogContent>

        <button
          onClick={() => handleActions()}
          style={{
            backgroundColor: "#ff2b2b",
            border: "none",
            color: "white",
            padding: ".5rem 0",
          }}
        >
          {actionTitle}
        </button>
      </Dialog>
    </>
  );
}

export default AskUserDialog;
