import React from "react";
import { useState } from "react";
import { MyRoute } from "../Hmap/RouteMap/Route";
import "./RideSum.css";

function RideSum(){

    const [Source,setSource] = useState({"lat":19.207002414616806,"lng":73.00504507040176});
    const [Dest,setDest] = useState({"lat":19.078304305559712,"lng": 72.88186213651178});
    console.log(Source,Dest)
   
    return(
        <div>
            {Source&&Dest?<MyRoute source={Source} dest={Dest}/>:<div></div>}
            <div className="container-fluid  drCont">
                <div className="container shadow drinfo rounded">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="drpic m-auto">
                                <img src={ 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='profile-pic' />
                            </div>
                            <p><b>Ramesh Yadav</b></p>
                            <p>Vehicle : <b>Taxi</b> </p>
                            <p>Contact Number : <b>9874563210</b> </p>
                        </div>
                        <div className="col-lg-7" style={{textAlign:"left"}}>
                            <p>Pickup Location: <b>Some Address</b></p>
                            <p>Destination Location: <b>Some Address</b></p>
                            <p>Ride Distance: <b>15 km</b></p>
                            <p>Estimated Duration: <b>40 min</b></p>
                            <p>Ride Fare: <b>475</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RideSum;