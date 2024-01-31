import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";

const ChangePasswordContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleChangePassword = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setValidationError("New password and confirm password must match.");
      return;
    }

    // Add logic to handle password change
    // For demonstration purposes, let's just open the confirmation dialog
    setValidationError("");
    handleOpenConfirmationDialog();
  };

  const handleConfirmChangePassword = () => {
    // Perform actual password change logic here
    setDialogOpen(true);
    handleCloseConfirmationDialog();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleToggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <div>
      <Card
        sx={{
          height: "600px",
          padding: "16px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>

          <ChangePasswordContainer>
            <TextField
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleToggleShowCurrentPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />

            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleToggleShowNewPassword} edge="end">
                    {showNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />

            <TextField
              label="Confirm New Password"
              type={showConfirmNewPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleToggleShowConfirmNewPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />

            {validationError && (
              <Typography color="error" style={{ marginBottom: "10px" }}>
                {validationError}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              style={{ marginTop: "20px" }}
            >
              Change Password
            </Button>
          </ChangePasswordContainer>
        </CardContent>
      </Card>

      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change your password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmChangePassword}
            color="primary"
            autoFocus
          >
            Yes, Change Password
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Password Changed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password has been successfully changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
