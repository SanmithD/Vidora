import axios from 'axios';

export const AxiosInstance = axios.create({
    baseURL: 'https://vidora-xygf.onrender.com/api',
    withCredentials: true
});