import React from "react";
import { useState,useEffect } from "react";
import { MyRoute } from "../BookRide/RouteMap/Route";
import axios from "axios";
import socket from "../../socket";
import MyModal from "../base/MyModal";

import "./RideSum.css";
import { Navigate, useNavigate } from "react-router-dom";

function RideSum(){

    const [Source,setSource] = useState();
    const [Dest,setDest] = useState();
    const [fareid,setfareid] = useState("");
    const [statusMsg, setstatusMsg] = useState("Finding Driver!!");
	const [modalShow, setModalShow] = useState(true);
    const [driverPic,setdriverPic] = useState();
    const [rideInfo,setrideInfo] = useState();
    const [toggle,settoggle] = useState(false);
    const navigate = useNavigate();
    console.log(Source,Dest)

    const getRideInfo = async() =>{
        console.log(fareid)
        try {
            var data =await axios.get(`/api/passenger/getOneRide/${fareid}`,{withCredentials:true}) 
            console.log(data.data);
            setrideInfo(data.data);
            setSource(data.data.source)
            setDest(data.data.destination)
            console.log(data.data.driver.driverPhoto)
            setdriverPic(data.data.driver.driverPhoto)
            await settoggle(!toggle);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        socket.on("allottedPassenger",(data)=>{
            console.log("allotted")
            console.log(data)
            if(data.status=="success"){
                setstatusMsg(data.message)
                setfareid(data.fareid);
                //getRideInfo()
                setModalShow(false)
                settoggle(!toggle)
            }else{
                setstatusMsg(data.message)
                setTimeout(() => {
                    
                }, 2000);
                navigate('/ride/book-ride');
            }
            // navigate('/');
            // setRide(data.fareid)
          })
    },[])

    useEffect(()=>{
        getRideInfo();
    },[fareid]);
   
    return(
        <>
        <div>
            <div key={toggle}>
            {Source&&Dest?<MyRoute source={Source} dest={Dest}/>:<div></div>}
            </div>
            
            <div className="container-fluid  drCont">
                <div className="container shadow drinfo rounded">
                    {rideInfo?<div className="row">
                        <div className="col-lg-5">
                            <div className="drpic m-auto">
                                {rideInfo?<img src={rideInfo.driver.driverPhoto || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='profile-pic' />:<img src={ 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='profile-pic' />}
                                
                            </div>
                            <p><b>{rideInfo.driver.account.name}</b></p>
                            <p>Vehicle : <b>Taxi</b> </p>
                            <p>Contact Number : <b>{rideInfo.driver.account.phone}</b> </p>
                        </div>
                        <div className="col-lg-7" style={{textAlign:"left"}}>
                            <div className="row rinfo">
                                <div className="col-lg-3">
                                Pickup Location:
                                </div>
                                <div className="col-lg-9">
                                <b>{rideInfo.source.address}</b>
                                </div>
                            </div>
                            <div className="row rinfo">
                                <div className="col-lg-3">
                                Destination Location:
                                </div>
                                <div className="col-lg-9">
                                <b>{rideInfo.destination.address}</b>
                                </div>
                            </div>
                            <div className="row rinfo">
                                <div className="col-lg-3">
                                Ride Distance:
                                </div>
                                <div className="col-lg-9">
                                <b>{rideInfo.distanceEstimate} km</b>
                                </div>
                            </div>
                            <div className="row rinfo">
                                <div className="col-lg-3">
                                Estimated Duration:
                                </div>
                                <div className="col-lg-9">
                                <b>{rideInfo.timeEstimate} min</b>
                                </div>
                            </div>
                            <div className="row rinfo">
                                <div className="col-lg-3">
                                Ride Fare:
                                </div>
                                <div className="col-lg-9">
                                <b>{rideInfo.fareEstimate}</b>
                                </div>
                            </div>
                            <div>
                            <button id="chatBut">Chat with Driver  <i class="fas fa-location-arrow"></i></button>
                            </div>
                            {/* <p>Pickup Location: <b>Some Address</b></p>
                            <p>Destination Location: <b>Some Address</b></p>
                            <p>Ride Distance: <b>15 km</b></p>
                            <p>Estimated Duration: <b>40 min</b></p>
                            <p>Ride Fare: <b>475</b></p> */}
                        </div>
                    </div>:<div></div>}
                    
                </div>
            </div>
            
        </div>
        <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        msg={statusMsg}
        />
        </>
    )
}

export default RideSum;