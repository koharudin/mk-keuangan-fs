import axios from 'axios'
import * as auth from "../utils/auth"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

axios.defaults.withCredentials = true

api.interceptors.request.use((config) => {
    const token = auth.getToken();
    console.log("token");
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const logout = async () => {

    await api.get('/logout')
}
