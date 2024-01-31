import { create } from "zustand";

const useBookingPageClass = create((set) => ({
  currentClassname: "classname--rightslide",

  setCurrentClassname: (currentClassname) => set({ currentClassname }),
}));

export default useBookingPageClass;
