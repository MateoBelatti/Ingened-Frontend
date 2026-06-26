import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7229'; // Update port to .NET default or read from env

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para peticiones
httpClient.interceptors.request.use(
  (config) => {
    // Si tienes el token guardado en localStorage, lo agregamos automáticamente
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si la respuesta es 401 (No autorizado), deslogueamos al usuario
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth-logout'));
    }
    return Promise.reject(error);
  }
);

