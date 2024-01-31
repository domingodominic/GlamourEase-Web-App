import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Lists from "../settings/Lists";
const Settings = () => {
  return (
    <>
      <Box minHeight="100vh" bgcolor="#eef2f6">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
            <Lists />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
