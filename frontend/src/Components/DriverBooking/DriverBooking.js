import React,{ useState,useEffect} from "react";
import socket from "../../socket";
import './Drbook.css'
import { useDispatch } from "react-redux";
import { setDetails } from "../../Redux/features/rideChatSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../AxiosSetUp";
import MyModal from "../Base/MyModal";

function DriverBooking (){

    const [acceptmsg,setAccept]= useState("");
    const [fare,setfare] = useState();
    const [otp,setotp]=useState();
    const [amt,setamt]=useState();
    const [ rideinfo,setrideinfo] =useState();
    const dispatch = useDispatch();
    const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);

    function acceptRide(){
        console.log(acceptmsg)
        socket.emit("accept",acceptmsg)
    }

    const getRideInfo = async() =>{
        try {
            var data =await axiosInstance.get(`/api/driver/getOneRide/${fare}`,{withCredentials:true}) 
            console.log(data.data);
            setrideinfo(data.data);
          

        } catch (error) {
            console.log(error);
        }
    }

    const verifyOTP = async(e) =>{
        
        console.log(otp);
        try{
            var vfy = await axiosInstance.put('/api/driver/startRide',{otp:otp},{withCredentials:true});
            console.log(vfy);
            setstatusMsg(vfy.data.msg)
            setModalShow(true)
            document.getElementById("myotp").style.display="none"
            document.getElementById("myamt").style.display="block"

        }catch(err){
            console.log(err);
        }
    }

    const submitDetail = async(e) =>{
        try{
            var det = await axiosInstance.post('/api/driver/rideComplete',{paidAmt:amt},{withCredentials:true});
            console.log(det)
            setstatusMsg(det.data.msg)
            setModalShow(true)
        }catch(err){
            console.log(err);
        }
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
            setfare(data.fareid)
            dispatch(setDetails(data.fareid))
            
          })
    },[])

    useEffect(()=>{
        fare && getRideInfo()
    },[fare])

    return(
        <>
        <div>
            <div className="container drbook vh-100 ">
                {acceptmsg?<button id="acceptRide" onClick={acceptRide}>Accept</button>:<div>No Cutomers waiting!</div>}
                {rideinfo?<div className="container">
                   <br />
                    <div className="row" style={{marginBottom:"2em"}}>
                        <div className="col-lg-3">
                            Pickup Location:
                        </div>
                        <div className="col-lg-8" style={{textAlign:"left"}}>
                            {rideinfo.source.address}
                        </div>
                    </div>
                    <div className="row" style={{marginBottom:"2em"}}>
                        <div className="col-lg-3">
                            Destination Location:
                        </div>
                        <div className="col-lg-8" style={{textAlign:"left"}}>
                            {rideinfo.destination.address}
                        </div>
                    </div>
                    <div className="row " id="myotp" style={{marginBottom:"2em"}}>
                        <div className="col-lg-3">
                        <label htmlFor="otpI">Enter OTP:</label>
                        </div>
                        <div className="col-lg-4" style={{textAlign:"left"}}>
                        <input type="text" className="otpI" onChange={(e)=>{setotp(e.target.value)}}/>
                        </div>
                        <div className="col-lg-5" style={{textAlign:"left"}}>
                        <button onClick={verifyOTP} className="otplink">Submit</button>
                        </div>
                    </div>
                    <div className="row " id="myamt" style={{marginBottom:"2em"},{display:"none"}}>
                        <div className="col-lg-3">
                        <label htmlFor="otpI">Enter Amount Received:</label>
                        </div>
                        <div className="col-lg-4" style={{textAlign:"left"}}>
                        <input type="text" className="otpI" onChange={(e)=>{setamt(e.target.value)}}/>
                        </div>
                        <div className="col-lg-5" style={{textAlign:"left"}}>
                        <button onClick={submitDetail} className="otplink">Submit</button>
                        </div>
                    </div>
                    
                    

                </div>:<div></div>}
                <br />
                <Link to={'/ride-chat'} className="otplink">Chat yo!</Link>
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

export default DriverBooking;