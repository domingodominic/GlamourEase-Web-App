import { create } from "zustand";

const useAppointmentStore = create((set) => ({
  municipality: "",
  branch: "",
  services: [],
  chosenService: {},
  price: 0,
  date: "",
  availableTime: [],
  time: "",
  branchID: "",
  serviceID: "",
  branchEmail: "",
  currentAppointments: {},

  setMunicipality: (municipality) => set({ municipality }),
  setBranch: (branch) => set({ branch }),
  setBranchEmail: (branchEmail) => set({ branchEmail }),
  setServices: (services) => set({ services }),
  setChosenService: (chosenService) => set({ chosenService }),
  setPrice: (price) => set({ price }),
  setTime: (time) => set({ time }),
  setBranchID: (branchID) => set({ branchID }),
  setServiceID: (serviceID) => set({ serviceID }),
  setAvailableTime: (availableTime) => set({ availableTime }),
  setDate: (date) => set({ date }),
  setCurrentAppointments: (currentAppointments) => set({ currentAppointments }),
}));

export default useAppointmentStore;
