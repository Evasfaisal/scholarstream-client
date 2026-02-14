import axios from 'axios';
import { auth } from '../firebase/firebase.config';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiUrl = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiUrl.interceptors.request.use(
    async (config) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting Firebase token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiUrl;
