import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Box } from "@mui/material";

const data = [
  {
    name: "Jan",
    SalonOwners: 2400,
    Customers: 4000,
    Appointments: 2400,
  },
  {
    name: "Feb",
    Customers: 3000,
    SalonOwners: 1398,
    Appointments: 2210,
  },
  {
    name: "Mar",
    Customers: 2000,
    SalonOwners: 500,
    Appointments: 2290,
  },
  {
    name: "Apr",
    Customers: 2780,
    SalonOwners: 3908,
    Appointments: 2000,
  },
  {
    name: "May",
    Customers: 1890,
    SalonOwners: 4800,
    Appointments: 2181,
  },
  {
    name: "June",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
  {
    name: "July",
    Customers: 3490,
    SalonOwners: 4300,
    Appointments: 2100,
  },
  {
    name: "Aug",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
  {
    name: "Sep",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
  {
    name: "Oct",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
  {
    name: "Nov",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
  {
    name: "Dec",
    Customers: 2390,
    SalonOwners: 3800,
    Appointments: 2500,
  },
];

const Barchart = () => {
  return (
    <Box>
      {" "}
      <BarChart width={1000} height={400} data={data}>
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Customers" fill="#00ABF4" />
        <Bar dataKey="SalonOwners" fill="#FF9A9C" />
        <Bar dataKey="Appointments" fill="#191444" />
      </BarChart>
    </Box>
  );
};

export default Barchart;
