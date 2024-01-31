import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import Barchart from "../Chart/Barchart";
import StoreIcon from "@mui/icons-material/Store";
import DataTable from "../datagrid/DataTable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import axios from "axios";
import { server_url } from "../../../serverUrl";

const Dashboard = () => {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalProviders, setTotalProviders] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);

  useEffect(async () => {
    const appointment = await axios.get(
      `${server_url}/appointments/totalAppointments`
    );

    setTotalAppointments(appointment.data.length);
  }, []);
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${server_url}/user//allBranches/totalBranch`
      );
      setTotalProviders(res.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(async () => {
    try {
      const res = await axios.get(
        `${server_url}/user/allCustomers/totalCustomers`
      );
      setTotalCustomer(res.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <>
      <Box minHeight="100vh" bgcolor="#eef2f6">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidebar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{
                      minWidth: 32.5 + "%",
                      height: 170,
                      backgroundColor: "#ff9a9c",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ padding: "10px" }}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: "600",
                              fontSize: 12,
                              color: "white",
                              textTransform: "uppercase",
                            }}
                          >
                            Total Registered Customers
                          </Typography>
                          <GroupOutlinedIcon
                            style={{
                              backgroundColor: "#e42a5d",
                              color: "white",
                              borderRadius: "10px",
                              height: "50px",
                              width: "60px",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "white",
                          }}
                        >
                          {totalCustomer}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      minWidth: 32.5 + "%",
                      height: 170,
                      backgroundColor: "#ff9a9c",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ padding: "10px" }}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: "600",
                              fontSize: 12,
                              color: "white",
                              textTransform: "uppercase",
                            }}
                          >
                            Total Registered Salon Owners
                          </Typography>
                          <StoreIcon
                            style={{
                              backgroundColor: "#e42a5d",
                              color: "white",
                              borderRadius: "10px",
                              height: "50px",
                              width: "60px",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "white",
                          }}
                        >
                          {totalProviders}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      minWidth: 32.5 + "%",
                      height: 170,
                      backgroundColor: "#ff9a9c",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ padding: "10px" }}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            variant="p"
                            sx={{
                              fontWeight: "600",
                              fontSize: 12,
                              color: "white",
                              textTransform: "uppercase",
                            }}
                          >
                            Total Appointments
                          </Typography>
                          <CalendarMonthIcon
                            style={{
                              backgroundColor: "#e42a5d",
                              color: "white",
                              borderRadius: "10px",
                              height: "50px",
                              width: "60px",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "white",
                          }}
                        >
                          {totalAppointments}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ height: 500, borderRadius: "20px" }}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "#757575",
                      }}
                    >
                      CHART
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: 1,
                        marginTop: 1,
                        marginLeft: 3,
                        color: "black",
                        opacity: "0.7",
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      Monthly Registrations and Appointments Comparison
                    </Typography>
                    <Barchart />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ height: 600, borderRadius: "20px" }}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "#757575",
                        marginBottom: 2,
                      }}
                    >
                      USERS
                    </Typography>

                    <DataTable />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
