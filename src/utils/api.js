// src/utils/api.js

const API_URL = import.meta.env.VITE_API_URL;

export function apiUrl(path) {
    // Remove leading slash if present
    if (path.startsWith('/')) path = path.slice(1);
    return `${API_URL}/${path}`;
}
