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
    const [ hideAcptBtn,sethideAcptBtn] =useState(false);
    const dispatch = useDispatch();
    const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);

    function acceptRide(){
        // console.log(acceptmsg)
        socket.emit("accept",acceptmsg)
    }

    const getRideInfo = async() =>{
        try {
            var data =await axiosInstance.get(`/api/driver/getOneRide/${fare}`,{withCredentials:true}) 
            // console.log(data.data);
            setrideinfo(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyOTP = async(e) =>{
        
        // console.log(otp);
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
            // console.log(det)
            setstatusMsg(det.data.msg)
            setModalShow(true)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        socket.on("ride",(data)=>{
            console.log("ride")
            // console.log(data)
            setAccept(data)
            // console.log(data);
            setfare(data.fareId)
        })

        socket.on("allottedDriver",(data)=>{
            console.log("allotted")
            // console.log(data)
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
            <div className="container drbook flex text-start">
                {acceptmsg ? <div>
                    <div className="w-100 flex">
                        <button className={`btn purple-btn ${hideAcptBtn && 'd-none'}`} onClick={() => {
                            acceptRide()
                            sethideAcptBtn(true)
                        }}>Accept Ride</button>
                    </div>
                        {rideinfo ? 
                            <div className="row flex">
                                <div className="form-confirm rounded p-4 col-md-8 col-12">
                                    <div className="row mb-4">
                                        <div className="fw-bold fs-4">Pickup Location:</div>
                                        <div className="ride-address fs-5">{rideinfo.source.address}</div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12 fw-bold fs-4">Destination Location:</div>
                                        <div className="col-12 ride-address fs-5">{rideinfo.destination.address}</div>
                                    </div>
                                    {sethideAcptBtn && <>
                                        <div className="my-5 w-100 flex my-3">
                                            <Link target={'_blank'} to={'/ride-chat'} className="btn purple-btn">Chat with passenger</Link>
                                        </div>
                                        <div className="row" id="myotp mb-4">
                                            <div className="col-12 fw-bold fs-4">
                                                <label htmlFor="otpI">Enter OTP*:</label>
                                            </div>
                                            <div className="col-12">
                                                <input className="ride-address otpI" type="text" onChange={(e)=>{setotp(e.target.value)}} required/>
                                            </div>
                                            <div className="w-100 flex mt-3">
                                            <button onClick={verifyOTP} className="btn purple-btn">Submit</button>
                                            </div>
                                        </div>
                                        <div className="my-4" id="myamt">
                                            <div className="w-100 fw-bold fs-4">
                                                <label htmlFor="otpI">Enter Amount Received:</label>
                                            </div>
                                            <div className="w-100">
                                                <input type="text" className="ride-address otpI"  onChange={(e)=>{setamt(e.target.value)}} required/>
                                            </div>
                                            <div className="w-100 flex mt-3">
                                                <button onClick={submitDetail} className="btn purple-btn">Submit</button>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        :<></>}
                    </div>
                    : <div className="h-100 w-100 flex flex-column" style={{color:'var(--purple)'}}>
                        <h3>No Cutomers waiting!</h3>
                        <i className="fas fa-user-clock display-1 my-5"></i>
                    </div>}
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