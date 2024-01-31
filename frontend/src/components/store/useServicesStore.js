import { create } from "zustand";

const useServicesStore = create((set) => ({
  currentServices: {},

  setCurrentServices: (currentServices) => set({ currentServices }),
}));

export default useServicesStore;
