import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Avatar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const fileInputRef = useRef(null);

  const handleSaveChanges = () => {
    // Check if at least one field is edited
    if (!firstName && !lastName && !username && !email) {
      // Show an error message or handle validation as needed
      return;
    }

    // If at least one field is edited, show the confirmation dialog
    setOpenDialog(true);
  };

  const handleConfirmSaveChanges = () => {
    // Perform actual save changes logic here
    // ...

    // Close the confirmation dialog
    setOpenDialog(false);
    // Show the Snackbar
    setOpenSnackbar(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleUploadPicture = () => {
    // Trigger the file input dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file, you might want to upload it to a server or perform other actions
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "600px",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "600px", padding: "20px" }}>
        <Typography sx={{ fontWeight: "600", marginBottom: "28px" }}>
          User Information
        </Typography>
        <Box
          sx={{
            marginBottom: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            src={profilePicture}
            sx={{ borderRadius: "5px", height: "60px", width: "60px" }}
          ></Avatar>
          <Button
            variant="contained"
            size="small"
            sx={{
              marginTop: "12px",
              marginLeft: "8px",
              fontSize: "12px",
              borderRadius: "6px",
            }}
            onClick={handleUploadPicture}
          >
            Upload new picture
          </Button>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <TextField
          label="Date of Birth"
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <TextField
            label="Country"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
          />
        </Box>
        <TextField
          label="Address"
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <Button variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Box>
        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to save the changes?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSaveChanges}
              color="primary"
              autoFocus
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar for indicating changes saved */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
};

export default Profile;
