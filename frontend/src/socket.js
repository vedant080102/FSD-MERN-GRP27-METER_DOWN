import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { axiosInstance } from "./AxiosSetUp";

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });

// socket.io.on('reconnect', () => {
//     socket.emit('join',{"user":user._id})
// })
// socket.onAny((event, ...args) => {
//     console.log(event, args);
//   });

export default socket;