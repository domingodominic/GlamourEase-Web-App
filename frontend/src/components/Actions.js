import React, { useContext, useState } from "react";
import "../scss/style.css";
import { IoIosAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AskUserDialog from "./AskUserDeleteService";
import AskUserUpdateService from "./AskUserUpdateService";
import AskUserToAdd from "./AskUserToAdd";
import DisplayServiceInfo from "./provider/DisplayServiceInfo";
import { ThemeContext } from "../App";
import { server_url } from "../serverUrl";
import axios from "axios";
import { async } from "@firebase/util";
function Actions({
  onDelete,
  serviceID,
  serviceIndex,
  getUpdatedData,
  functionDone,
  serviceData,
}) {
  const [actions, setActions] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [DialogContext, setDialogContext] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [dialogState, setDialogState] = useState(false);
  const [dialogAddState, setDialogAddState] = useState(false);
  const [dialogUpdateOption, setDialogUpdateOption] = useState(false);
  const [DisplayServiceDialog, setDisplayServiceDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { providerDatas } = useContext(ThemeContext);
  const [servicesData, setServicesData] = useState([]);

  //function to get the updated data

  // const getUpdatedData = async () => {
  //   setLoading(true);
  //   if (providerDatas.providerData && providerDatas.providerData._id) {
  //     try {
  //       const response = await axios.get(
  //         `${server_url}/provider/${providerDatas.providerData._id}`
  //       );

  //       setServicesData(response.data.data.services);

  //       if (response.status === 200) {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  // handle Delete
  const handleDelete = async () => {
    await onDelete(serviceID);

    if (functionDone) {
      getUpdatedData();
    }
  };

  const openDisplayDialog = async () => {
    setDisplayServiceDialog(true);
  };

  const openDialogDelete = () => {
    setDialogContext(
      "Deleting this service will make it unavailable to your customer."
    );
    setDialogTitle("Are you sure you want to delete?");
    setActionTitle("Delete");
    setDialogState(true);
    setActions({ function: handleDelete });
  };
  const openDialogAdd = () => {
    setDialogAddState(true);
  };

  const openDialogUpdate = async () => {
    setDialogUpdateOption(true);
  };

  return (
    <div className="main">
      <div className="up">
        <button className="card1" onClick={() => openDialogAdd()}>
          <IoIosAdd className="action--add" />
        </button>
        <button className="card2" onClick={() => openDisplayDialog()}>
          <IoEyeOutline className="action--view" />
        </button>
      </div>
      <div className="down">
        <button
          className="card3"
          onClick={() => {
            openDialogUpdate();
          }}
        >
          <CiEdit className="action--update" />
        </button>
        <button
          className="card4"
          onClick={() => {
            openDialogDelete();
          }}
        >
          <AiOutlineDelete className="action--delete" />
        </button>
      </div>
      <AskUserDialog
        dialogContext={DialogContext}
        dialogTitle={dialogTitle}
        actions={actions}
        actionTitle={actionTitle}
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
      <AskUserUpdateService
        serviceInfo={serviceData}
        serviceIndex={serviceIndex}
        serviceID={serviceID}
        getUpdatedData={getUpdatedData}
        dialogUpdateOption={dialogUpdateOption}
        setDialogUpdateOption={setDialogUpdateOption}
      />
      <AskUserToAdd
        serviceID={serviceID}
        getUpdatedData={getUpdatedData}
        dialogAddState={dialogAddState}
        setDialogAddState={setDialogAddState}
      />
      <DisplayServiceInfo
        serviceData={serviceData}
        setDisplayServiceDialog={setDisplayServiceDialog}
        DisplayServiceState={DisplayServiceDialog}
      />
    </div>
  );
}

export default Actions;
