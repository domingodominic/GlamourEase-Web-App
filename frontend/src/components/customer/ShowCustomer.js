import React, { useEffect, useState } from "react";
import Spinner from "../loaders_folder/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server_url } from "../../serverUrl";
function ShowCustomer() {
  const [customer, setCustomer] = useState({ services: [] });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${server_url}/customer/${id}`)
      .then((response) => {
        setCustomer(response.data);
        console.log(customer.services);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Show</h1>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Lastname</th>
              <th>Services</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 1 </td>
              <td>{customer.firstname}</td>
              <td>{customer.middlename}</td>
              <td>{customer.lastname}</td>
              <td>
                {customer.services.map((service, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />} {service}
                  </React.Fragment>
                ))}
              </td>
              <td>{customer.age}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowCustomer;
