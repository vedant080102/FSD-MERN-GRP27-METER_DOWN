import React,{ useState,useEffect} from "react";
import socket from "../../socket";
import './Drbook.css'

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
            <div className="conatiner flex  vh-100 drbook">

                {acceptmsg?<button onClick={acceptRide} id="acceptRide">Accept</button>:<div>No customers yet!</div>}
            </div>
            
        </div>
    )
}

export default DriverBooking;