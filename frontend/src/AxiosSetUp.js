import axios from 'axios';

export const baseURL = (window.location.hostname == 'localhost' ? 'http://localhost:3001' : window.location.origin);
// 'https://meter-down.herokuapp.com'//'http://localhost:3001'

// axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 300000,
});
