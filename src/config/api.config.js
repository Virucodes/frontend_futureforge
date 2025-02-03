// src/config/api.config.js

import axios from 'axios';

const API_BASE_URL = 'https://backend-wm1d.onrender.com';

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define all API routes
export const API_ROUTES = {
  // Chat routes
  CHAT_GUIDE: '/chat-guide',
  CHAT_TEST: '/chat-test',
  ANALYSIS: '/annalys',

  // User routes
  GET_USER_BY_EMAIL: '/user/getuserbyemail',
  UPDATE_USER: (id) => `/user/update/${id}`,
  LOGIN: '/user/login',
  REGISTER: '/user/register'
};

// API functions grouped by feature
export const authAPI = {
  register: (userData) => {
    return axiosInstance.post(API_ROUTES.REGISTER, userData);
  },
  login: (credentials) => {
    return axiosInstance.post(API_ROUTES.LOGIN, credentials);
  }
};

export const userAPI = {
  getUserByEmail: (email) => {
    return axiosInstance.post(API_ROUTES.GET_USER_BY_EMAIL, { email });
  },
  updateUser: (id, userData) => {
    return axiosInstance.put(API_ROUTES.UPDATE_USER(id), userData);
  }
};

// Add these to your existing api.config.js file

export const chatAPI = {
    // Get chat guide messages
    getChatGuide: (email) => {
      return axiosInstance.get(API_ROUTES.CHAT_GUIDE, {
        params: { email }
      });
    },

    // Get chat test messages
    getChatTest: (email) => {
        return axiosInstance.get(API_ROUTES.CHAT_TEST, {
        params: { email }
        });
    },

    // Create new chat test
    createChatTest: (payload) => {
        return axiosInstance.post(API_ROUTES.CHAT_TEST, payload);
    },
  
     
    // Create new chat guide
    createChatGuide: (payload) => {
      return axiosInstance.post(API_ROUTES.CHAT_GUIDE, payload);
    },
  
    // Update existing chat guide
    updateChatGuide: (payload) => {
      return axiosInstance.put(API_ROUTES.CHAT_GUIDE, payload);
    },

    // Update existing chat test
  updateChatTest: (payload) => {
    return axiosInstance.put(API_ROUTES.CHAT_TEST, payload);
  }

    
  };


  export const annalysAPI = {
    getAnnalys: (email) => {
      return axiosInstance.get(API_ROUTES.ANALYSIS, {
        params: { email },
      });
    },
  
    updateAnnalys: (email, payload) => {
      return axiosInstance.put(API_ROUTES.ANALYSIS, { email, ...payload });
    },
  };
  