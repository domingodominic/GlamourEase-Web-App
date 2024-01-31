import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

import { Dashboard, Settings } from "@mui/icons-material";
import { useAppStore } from "../appStore";
import { Toolbar } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const navigate = useNavigate();

  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />

      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                color: "#EA3A72",
                "& .MuiListItemIcon-root": {
                  color: "#ed558d",
                },
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",

                "&:hover": {
                  backgroundColor: "#FDE8EF",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                color: "#EA3A72",

                "& .MuiListItemIcon-root": {
                  color: "#ed558d",
                },
              },
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate("/settings");
              }}
              sx={{
                minHeight: 48,

                justifyContent: open ? "initial" : "center",
                "&:hover": {
                  backgroundColor: "#FDE8EF",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
