// lib/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.134.189:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
