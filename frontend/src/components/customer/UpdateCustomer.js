import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server_url } from "../../serverUrl";

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [services, setServices] = useState([]);
  const [age, setAge] = useState("");

  useEffect(() => {
    // Fetch the customer data based on the 'id' parameter
    axios
      .get(`${server_url}/customer/${id}`)
      .then((response) => {
        const customerData = response.data;
        setFirstname(customerData.firstname);
        setMiddlename(customerData.middlename);
        setLastname(customerData.lastname);
        setServices(customerData.services.join(", ")); // Convert services array to string
        setAge(customerData.age);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      firstname,
      middlename,
      lastname,
      services: services.split(",").map((service) => service.trim()), // Convert services string to array
      age,
    };

    try {
      // Send a PUT request to update the customer data
      await axios.put(`${server_url}/customer/${id}`, data);

      // Redirect to a different page after successful update
      navigate("/customers"); // You can specify the URL to navigate to
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div>
      <h1>Edit Customer</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <label>Services (comma-separated):</label>
        <input type="text" />

        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(firstname)}
        />
      </form>
      <button onClick={handleEdit()}>edit</button>
    </div>
  );
}

export default UpdateCustomer;
