import { create } from "zustand";

const useProfileinfoStore = create((set) => ({
  profilePicture: "",

  setProfilepicture: (profilePicture) => set({ profilePicture }),
}));

export default useProfileinfoStore;
