import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const rowsPerPageOptions = [5];
const defaultRowsPerPage = rowsPerPageOptions[0];

const data = [
  {
    id: 1,
    name: "Ullysis Ilao",
    registerDate: "2024-03-04",
    email: "ilaoullysis@gmail.com",
    status: "Active",
    role: "Provider",
  },
  {
    id: 2,
    name: "John Doe",
    registerDate: "2022-02-08",
    email: "johndoe123@gmail.com",
    status: "Active",
    role: "Customer",
  },
  {
    id: 3,
    name: "John Lander M. Aladano",
    registerDate: "2022-12-13",
    email: "jlaladano@gmail.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 4,
    name: "Dominic Domingo",
    registerDate: "2022-07-03",
    email: "dominicpunladomingo120@gmail.com",
    status: "Active",
    role: "Customer",
  },
  {
    id: 5,
    name: "Dominic Domingo",
    registerDate: "2022-02-08",
    email: "dominicpunladomingo120@gmail.com",
    status: "Active",
    role: "Customer",
  },

  {
    id: 6,
    name: "Angelica Joli",
    registerDate: "2022-03-05",
    email: "angelicajoli@gmail.com",
    status: "Active",
    role: "Provider",
  },
  {
    id: 7,
    name: "John Smith",
    registerDate: "2022-02-04",
    email: "johnsmith@gmail.com",
    status: "Active",
    role: "Customer",
  },
  {
    id: 8,
    name: "Dominic Domingo",
    registerDate: "2022-05-05",
    email: "dominicpunladomingo28@gmail.com",
    status: "Active",
    role: "Customer",
  },
];

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(defaultRowsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All Users");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = () => {
    setPage(0);
  };

  const handleFilterButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterMenuItemClick = (filter) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
  };

  const handleArchiveClick = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleUnarchiveClick = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleArchiveConfirm = () => {
    // Get the current category before performing the archive logic
    const currentCategory = selectedFilter;

    // Perform archive logic here
    const updatedData = data.map((item) =>
      item.id === selectedUserId ? { ...item, status: "Inactive" } : item
    );

    // Update your data directly with the new values
    data.splice(0, data.length, ...updatedData);

    setOpenDialog(false);

    // Set the selected filter back to the current category
    setSelectedFilter(currentCategory);
  };

  const handleUnarchiveConfirm = () => {
    // Perform unarchive logic here
    const updatedData = data.map((item) =>
      item.id === selectedUserId ? { ...item, status: "Active" } : item
    );

    // Update your data directly with the new values
    data.splice(0, data.length, ...updatedData);

    setOpenDialog(false);

    // Set the selected filter back to "Archived Users"
    setSelectedFilter("Archived Users");
  };

  const filteredData =
    selectedFilter === "All Users"
      ? data.filter((item) => item.status === "Active")
      : data.filter((item) => {
          if (selectedFilter === "Archived Users") {
            return item.status === "Inactive";
          } else {
            return item.role === selectedFilter && item.status === "Active";
          }
        });

  return (
    <div>
      <Button
        onClick={handleFilterButtonClick}
        variant="contained"
        startIcon={<ArrowDropDownIcon />}
      >
        {selectedFilter}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleFilterMenuItemClick("All Users")}>
          All Users
        </MenuItem>
        <MenuItem onClick={() => handleFilterMenuItemClick("Customer")}>
          Customer
        </MenuItem>
        <MenuItem onClick={() => handleFilterMenuItemClick("Provider")}>
          Provider
        </MenuItem>
        <MenuItem onClick={() => handleFilterMenuItemClick("Admin")}>
          Admin
        </MenuItem>
        <MenuItem onClick={() => handleFilterMenuItemClick("Archived Users")}>
          Archived Users
        </MenuItem>
      </Menu>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.registerDate}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.status === "Active" ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CheckCircleIcon style={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    {row.status === "Active" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleArchiveClick(row.id)}
                      >
                        Archive
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleUnarchiveClick(row.id)}
                      >
                        Unarchive
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedFilter === "Archived Users"
              ? "Are you sure you want to unarchive this user?"
              : "Are you sure you want to archive this user?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button
            onClick={
              selectedFilter === "Archived Users"
                ? handleUnarchiveConfirm
                : handleArchiveConfirm
            }
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
