import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Link,useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './Review.css'
import { axiosInstance } from "../../AxiosSetUp";
import MyModal from "../Base/MyModal";
import socket from '../../socket';


const Review = () => {
    const [stars, setStars] = useState()
    const [rideId, setRideId] = useState()
    const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();
    const location = useLocation();
    var rideData=location.pathname.split("/")
    console.log("pathname",rideData[rideData.length-1])
    

    useEffect(() => {
        setRideId(rideData[rideData.length-1])
    }, [])

 

    const ratingChanged = (newRating) => {
        console.log(newRating,rideId);
        setStars(newRating)
      };

    const sendReview=(e)=>{
        var data={
            star:stars,
            comment:"",
            rideId:rideId
        }

        axiosInstance.post("/api/passenger/giveReview", data, { withCredentials: true })
		.then((res) => {
			
			setstatusMsg("Review recorded successfully! 🎉");
			
			setModalShow(true);
			setTimeout(() => {
				
				navigate("/");
			}, 2500);

		}).catch((err) => {
			console.log(err.response.data);
			setstatusMsg(<>
				<h4 className="mb-3 pb-1">❗Some error occured</h4>
				<span className="mt-3">{err.response.data.msg}</span>
			</>);
			setModalShow(true);
		})
    }
    return (
        <>
        <div style={{"backgroundColor":"var(--yellow)","color":"var(--yellow)","paddingTop":"8vh","paddingBottom":"8vh","paddingLeft":"2vh","paddingRight":"2vh"}}>
            <div style={{"backgroundColor":"var(--purple)","padding":"4vw"}}>
            <div className='col' >
               <h1 style={{"marginBottom":"5vh"}}>Review</h1>
               <p>Please rate your experience:</p>
               <div className="" style={{"display":"flex","justifyContent":"center"}}>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={54}
                        activeColor="#ffd700"
                    />
                </div>
                <div style={{"marginTop":"5vh"}}>
                    <button className='submitButton' onClick={sendReview}>Submit</button>
                </div>

               
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

export default Review
