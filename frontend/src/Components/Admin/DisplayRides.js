
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../AxiosSetUp"

export default function DisplayRides() {

    const [allRides, setAllRides] = useState([]);
    const [completedRides, setcompletedRides] = useState([]);
    const [incompRides, setincompRides] = useState([]);

    const getRides = async() => {
        await axiosInstance.get('/api/admin/getAllFares')
        .then(doc => {
            // console.log("all rides", doc.data);
            setAllRides(doc.data);
        }).catch(e => console.log(e));
    }

    useEffect(()=> getRides(), [1]);

    useEffect(()=> {
        var cr=[], rr=[]
        if (allRides.length != 0) {
            allRides.forEach(doc => {
                doc.completed ? cr.push(doc) : rr.push(doc);
            });
            // console.log("data:", cr, rr);
        }
        setcompletedRides(cr)
        setincompRides(rr)
    },[allRides])

    const cards = (item, i) => <div key={i} className="col-md-4 col-12">
        <div className="card shadow" style={{borderColor:'var(--purple)'}}>
            <div class="card-body">
                {/* 
                bookedAt: "2021-12-28T05:17:37.660Z"
                completed: false
                destination: {_id: '61ca9df1e648ced420495174', lat: 18.949, lng: 72.83866, address: 'CST, Mumbai, Maharashtra, India', __v: 0}
                distanceEstimate: 35.9
                driver: {location: {…}, _id: '61a5f3e4598949923f387a77', permit: 'http://drive.google.com/uc?export=view&id=1TA7vfVTSOuRV4g8Fweq3XIwFHtB1kljS', liscence: 'http://drive.google.com/uc?export=view&id=1ntcao0VUBDrKQ5ERI3H_3STPiJHVq9Le', registration: 'http://drive.google.com/uc?export=view&id=1LEcYEWFun3kwoY7ey2KrFzJeXsVuMEKS', …}
                fareEstimate: 713
                otp: 1091
                passenger: {_id: '61a683667178afd88609f137', address: Array(0), prevRides: Array(3), upcomingRides: Array(0), ongoingRide: '61ca9df1e648ced420495176', …}
                rideStart: null
                source: {_id: '61ca9df1e648ced420495172', lat: 19.1882, lng: 72.94368, address: 'Vishram Tower 2', __v: 0}
                startType: "now"
                startsAt: "2021-12-28T05:17:37.660Z"
                time: "day"
                */}
                <h6 class="yellow-btn active badge rounded-pill mb-2">{item.completed ? '✅ Completed' : '❌ Not Completed'}</h6>
                {item.completed && <>
                    <p class="card-title fw-bold text-uppercase text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title={item.passenger._id}>UserId: {item.passenger._id}</p>
                    <p class="card-title fw-bold text-uppercase text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title={item.driver._id}>DriverId: {item.driver._id}</p>
                </>}
                <p className="text-truncate"data-bs-toggle="tooltip" data-bs-placement="top" title={item.destination.address}>destination: {item.destination.address}</p>
                <p className="text-truncate"data-bs-toggle="tooltip" data-bs-placement="top" title={item.source.address}>source: {item.source.address}</p>
                {/* <p className="text-muted text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title={item.id}>id: {item.id}</p> */}
            </div>
        </div>
    </div>

    return (
        <>
            <div className="w-100 py-3">
                <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="btn purple-btn mx-2 active" id="pills-all-Rides-tab" data-bs-toggle="pill" data-bs-target="#pills-all-Rides" type="button" role="tab" aria-controls="pills-all-Rides" aria-selected="true">All Rides</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="btn purple-btn mx-2" id="pills-completedRides-tab" data-bs-toggle="pill" data-bs-target="#pills-completedRides" type="button" role="tab" aria-controls="pills-completedRides" aria-selected="false">Completed Rides</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="btn purple-btn mx-2" id="pills-incompRides-tab" data-bs-toggle="pill" data-bs-target="#pills-incompRides" type="button" role="tab" aria-controls="pills-incompRides" aria-selected="false">Unfinished Rides</button>
                    </li>
                </ul>
                <div className="bg-white mx-2 mx-md-5 rounded p-2 p-md-4">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-all-Rides" role="tabpanel" aria-labelledby="pills-all-Rides-tab">
                            <div className="row gy-5">{allRides.length != 0 && allRides.map((data, i)=> cards(data, i))}</div>
                        </div>
                        <div class="tab-pane fade" id="pills-completedRides" role="tabpanel" aria-labelledby="pills-completedRides-tab">
                            <div className="row gy-5">{completedRides.length != 0 && completedRides.map((data, i)=> cards(data, i))}</div>
                        </div>
                        <div class="tab-pane fade" id="pills-incompRides" role="tabpanel" aria-labelledby="pills-incompRides-tab">
                            <div className="row gy-5">{incompRides.length != 0 && incompRides.map((data, i)=> cards(data, i))}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}