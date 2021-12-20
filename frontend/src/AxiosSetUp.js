import axios from 'axios';

export const baseURL = 'http://localhost:3001'

axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 300000,
});
