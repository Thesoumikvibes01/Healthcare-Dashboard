////frontednd/src/services/api.jsx
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; // Adjust based on your backend URL

const api = axios.create({
    baseURL: API_URL,
});

// Functon to access home page
export const homePage = async()=>{
    return await api.get('/home');
}

// Function to check symptoms (send them to the backend)
export const checkSymptoms = async (symptoms) => {
    return await api.post('/check-symptoms', { symptoms });
};

// Function to register a user
export const registerUser = async (userData) => {
    return await api.post('/register', userData);
};

// Function to login a user
export const loginUser = async (userData) => {
    return await api.post('/login', userData);
};

// Function to access protected route
export const getProtectedData = async (token) => {
    return await api.get('/protected', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
