import { useContext, useEffect, useState } from "react";
import { ThemeContext } from ".././../App";
import image from "../../images/noappointment.png";
import NoAvailableToShow from "../NoAvailableToShow";
import CustomerAppointmentMB from "./CustomerAppointmentMB";
import CustomerAppointmentsTable from "./CustomerAppointmentsTable";

function ProviderAppointment() {
  const [serviceData, setServiceData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const { theme, customerProfiles, providerDatas } = useContext(ThemeContext);

  const definition = "You have no appointments today.";
  useEffect(() => {
    setServiceData(providerDatas.providerData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="providerService--mainContainer">
      {isMobile ? <CustomerAppointmentMB /> : <CustomerAppointmentsTable />}
      {/* <NoAvailableToShow definition={definition} image={image} /> */}
    </div>
  );
}

export default ProviderAppointment;
