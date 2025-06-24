import toast from 'react-hot-toast';
import { create } from 'zustand';
import { AxiosInstance } from '../lib/axiosInstance';

export const UserStore = create((set) => ({
    authUser: null,
    userProfile: null,
    success: false,
    isSigning : false,
    isLogging: false,
    isProfile : false,

    signup : async(data) =>{
        set({ isSigning: true })
        try {
            const response = await AxiosInstance.post('/auth/signup',data)
            set({ authUser: response.data });
            set({ success: true });
            toast.success(response.data.message)
        } catch (error) {
            toast.error("Fail to signup");
            console.log(error)
        }finally{
            set({ isSigning: false });
        }
    },

    login : async(data) =>{
        set({ isLogging: true });
        try {
            const response = await AxiosInstance.post('/auth/login',data)
            set({ authUser: response.data });
            set({ success: true });
            toast.success(response.data.message)
        } catch (error) {
            toast.error("Fail to signup");
            console.log(error)
        }finally{
            set({ isLogging: false });
        }
    },

    profile : async() =>{
        set({ isProfile: true });
        try {
            const response = await AxiosInstance.get(`/auth/profile`);
            set({ userProfile: response.data });
            set({ isProfile: false })
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }finally{
            set({ isProfile: false })
        }
    },

    deleteProfile: async() =>{
        try {
            await AxiosInstance.delete(`/auth/delete`);
            toast.success("Account deleted")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    },

    logout: () =>{
        try {
            set({ authUser: '' });
            toast.success("Account logged out")
        } catch (error) {
            console.log(error);
        }
    }
}))