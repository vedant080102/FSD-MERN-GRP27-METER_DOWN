import React,{ useState,useEffect} from "react";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { setDetails } from "../../Redux/features/rideChatSlice";
import { Link } from "react-router-dom";

function DriverBooking (){

    const [acceptmsg,setAccept]= useState("");
    const dispatch = useDispatch();

    function acceptRide(){
        console.log(acceptmsg)
        socket.emit("accept",acceptmsg)
    }

    useEffect(()=>{
        socket.on("ride",(data)=>{
            console.log("ride")
            console.log(data)
            setAccept(data)
        })

        socket.on("allottedDriver",(data)=>{
            console.log("allotted")
            console.log(data)
            dispatch(setDetails(data.fareid))
          })
    },[])

    return(
        <div>
            <button onClick={acceptRide}>Accept</button>
            <Link to={'/ride-chat'}>Chat yo!</Link>
        </div>
    )
}

export default DriverBooking;