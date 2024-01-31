import { Link, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import image from "../../images/registration-form-img.jpg";
import { ThemeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
function AdminLogin() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      alert("loging in");
    } else {
      alert("invalid credentials");
    }
  };
  return (
    <div className="container--body">
      <div className={`content--container login--bodycd`}>
        <div className="reg--bg">
          <img src={image} alt="salon image woman" />
        </div>
        <div className="form">
          <h2 style={{ color: "#ff9a9c", marginBottom: "3rem" }}>Log In</h2>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ff9a9c",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fdcfcf",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fdcfcf",
                  },
                },
                "& label.Mui-focused": {
                  color: "#fdcfcf",
                },
                marginBottom: 2,
                padding: 0.1,
                width: "100%",
              }}
            />
          </div>

          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ff9a9c",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fdcfcf",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fdcfcf",
                  },
                },
                "& label.Mui-focused": {
                  color: "#fdcfcf",
                },
                marginBottom: 1,
                padding: 0.1,
                width: "100%",
              }}
            />
          </div>
          <div>
            <button
              style={{ marginBottom: "3rem" }}
              className="fadein--btn"
              onClick={() => handleLogin()}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default AdminLogin;
