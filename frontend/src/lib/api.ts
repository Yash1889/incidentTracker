import axios from 'axios';

export const api = axios.create({
    baseURL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api').replace(/\/$/, '') + (process.env.NEXT_PUBLIC_API_URL?.endsWith('/api') ? '' : '/api'),
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
