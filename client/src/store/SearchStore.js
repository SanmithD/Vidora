import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosInstance } from "../lib/axiosInstance";

export const UseSearchStore = create((set, get) => ({
  searching: null,
  isSearching: false,
  isLoading: false,
  recentSearch : null,

  currentSearching: async (data) => {
    if (!data || data.trim().length === 0) {
      return; 
    }
    set({ isSearching: true });
    try {
      const response = await AxiosInstance.get(
        `/search/?title=${encodeURIComponent(data)}`
      );
      set({ searching: response.data.filteredData })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      set({ isSearching: false });
    }
  },

  saveSearch: async(id) =>{
    try {
        await AxiosInstance.post(`/search/save/${id}`);
        await get().getRecent();
    } catch (error) {
        console.log(error)
    }
  },

  getRecent : async() =>{
    set({ isLoading: true });
    try {
        const response = await AxiosInstance.get(`/search/recent`);
        set({ recentSearch: response.data });
    } catch (error) {
        console.log(error);
    }
  }
}));
