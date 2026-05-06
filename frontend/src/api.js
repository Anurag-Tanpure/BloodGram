import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    // No baseURL — all requests are relative so Vite proxy forwards them
    // /auth/* → :8082,  /donor/* → :8083
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'An error occurred';
        if (error.response && error.response.data) {
            if (typeof error.response.data === 'string') {
                message = error.response.data;
            } else if (error.response.data.message) {
                message = error.response.data.message;
            } else if (error.response.data.error) {
                message = error.response.data.error;
            }
        }
        toast.error(message);
        return Promise.reject(error);
    }
);

export default api;
