import * as React from "react";
import { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoSettingsOutline, IoKeyOutline } from "react-icons/io5";
import "../../scss/style.css";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidChevronDown, BiKey } from "react-icons/bi";
import { ThemeContext } from "../../App";
import { auth } from "../../firebase-config";
import { useSnackbar } from "notistack";
import { signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import ResetPassword from "../change password/ResetPassword";
import axios from "axios";
export default function MyAccordion({ handleForgotPassOpen, email }) {
  const { theme, updateThemeState } = useContext(ThemeContext);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const openDialog = () => {
    handleForgotPassOpen(true);
  };
  const openResetDialog = (data) => {
    setDialogOpen(data);
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

  const reOpenDialog = () => {
    setDialogOpen(true);
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Accordion className={`Accordion--container--${theme}`}>
        <AccordionSummary
          expandIcon={<BiSolidChevronDown className={`color--${theme}`} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="typography">
            <IoSettingsOutline />
            <p className="accordion--title">Settings and Privacy</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={`accordion--item--${theme}`}>
            <BsPerson /> <p>Change profile information</p>
          </div>
          <div
            className={`accordion--item--${theme}`}
            onClick={openResetDialog}
          >
            <IoKeyOutline /> <p>Change Password</p>
          </div>
        </AccordionDetails>
      </Accordion>
      <ResetPassword
        email={email}
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}
