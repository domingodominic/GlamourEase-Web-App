import React, { useState } from "react";
import axios from "axios";
import { server_url } from "../../serverUrl";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [services, setServices] = useState([]);
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname,
      middlename,
      lastname,
      services,
      age,
    };

    try {
      // Send a POST request to your API to add the customer
      await axios.post(`${server_url}/customer/`, data);

      // Redirect to a different page after successful submission
      navigate("/"); // You can specify the URL to navigate to
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="middlename">Middle Name:</label>
          <input
            type="text"
            id="middlename"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="services">Services (comma-separated):</label>
          <input
            type="text"
            id="services"
            value={services.join(", ")}
            onChange={(e) => setServices(e.target.value.split(","))}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ width: "100%" }}>
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
