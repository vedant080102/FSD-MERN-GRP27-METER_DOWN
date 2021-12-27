import React,{ useState,useEffect} from "react";
import socket from "../../socket";

function DriverBooking (){

    const [acceptmsg,setAccept]= useState("");

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
            // setRide(data.fareid)
          })
    },[])

    return(
        <div>
            <button onClick={acceptRide}>Accept</button>
        </div>
    )
}

export default DriverBooking;