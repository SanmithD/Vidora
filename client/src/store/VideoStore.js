import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosInstance } from "../lib/axiosInstance";

export const VideoStore = create((set, get) => ({
    allVideos: null,
    isPosting: false,
    isLoading: false,
    singleVideo: null,

    postVideo : async(data) =>{
        set({ isPosting: true });
        try {
            await AxiosInstance.post(`/video/post`,data);
            await get().getAllVideos();
            toast.success("Video posted");
            set({ isPosting: false });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }finally{
            set({ isPosting: false })
        }
    },

    getAllVideos : async() =>{
        set({ isLoading : true })
        try {
            const response = await AxiosInstance.get(`/video/getAll`);
            set({ isLoading: false });
            set({ allVideos : response.data.response });
        } catch (error) {
            console.log(error);
            toast.error("Something wrong")
        }finally{
            set({ isLoading: false });
        }
    },

    getVideoById: async(id) =>{
        set({ isLoading : true });
        try {
            const response = await AxiosInstance.get(`/video/getById/${id}`);
            set({ isLoading: false });
            set({ singleVideo: response.data.response });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }finally{
            set({ isLoading: false });
        }
    }
}))