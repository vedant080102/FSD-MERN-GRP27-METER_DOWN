import { useEffect, useState } from "react";
import axios from "axios";
import {ReactComponent as Rick} from '../../../Media/rickshaw.svg'
import {ReactComponent as Taxi} from '../../../Media/taxi.svg'
import { axiosInstance } from "../../../AxiosSetUp";
const humanizeDuration = require("humanize-duration");

export default function EstimatePrice(props) {

    const shortEnglishHumanizer = humanizeDuration.humanizer({
        language: "shortEn",
        languages: {
          shortEn: {
            h: () => "hr",
            m: () => "min",
          },
        },
        serialComma: false,
        units: ["h", "m"],
        maxDecimalPoints: 0,
        conjunction: " "
    });

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;
    const [rideChosen, setrideChosen] = useState('');
    const [duration, setduration] = useState('');
    const [distance, setdistance] = useState('');
    const [estimation, setestimation] = useState('');

    const selectRideChange = (e) => {
        var val = e.currentTarget.value;
        setrideChosen(val)
        console.log(val)
    }

    const getEstimate = async () => {
        await axios.get('https://router.hereapi.com/v8/routes', {
            'params': {
                'apiKey': APP_CODE_HERE,
                'origin': `${props.pickup.position.lat},${props.pickup.position.lng}`,
                'destination': `${props.destination.position.lat},${props.destination.position.lng}`,
                'transportMode': 'car',
                'return': 'summary,typicalDuration',
            }
        }).then((data) => {
            console.log("data:", data.data.routes[0].sections[0])
            let dura = data.data.routes[0].sections[0].summary.typicalDuration * 1000;
            let dis = data.data.routes[0].sections[0].summary.length / 1000;
            console.log("duration:", shortEnglishHumanizer(Math.ceil(dura)), "len:", dis.toFixed(1));
            setduration(shortEnglishHumanizer(Math.ceil(dura)))
            setdistance(dis.toFixed(1));
        }).catch((e)=> console.log(e))
    }

    const getPrice = () => {
		axiosInstance.get(`/api/passenger/priceEstimate?time=day&type=${rideChosen}&distance=${distance}`, { withCredentials: true })
        .then((data) => {
            console.log("estimation:", data.data.price);
            setestimation(data.data.price);
        }).catch(e=> console.log(e.response));
    }

    useEffect(() => getEstimate(), [1]);

    useEffect(()=> rideChosen ? getPrice() : console.log(), [rideChosen]);

    return <>
        <div id="rides"className="my-5">
            <h3 className="text-start">Available Rides</h3>
            <div className="row flex-start btn-group" role="group" aria-label="Basic radio toggle button group">
                <div className="col-6">
                    <input type="radio" className="btn-check" value='Auto' name="rideType" id="rideType1" autoComplete="off" onChange={selectRideChange}/>
                    <label className="btn purple-btn rounded-pill border-2" htmlFor="rideType1">
                        <Rick height='75'/>
                    </label>
                </div>
                <div className="col-6">
                    <input type="radio" className="btn-check" value='Taxi' name="rideType" id="rideType2" autoComplete="off" onChange={selectRideChange}/>
                    <label className="btn purple-btn rounded-pill border-2" htmlFor="rideType2">
                        <Taxi height='75'/>
                    </label>
                </div>
            </div>
        </div>

        <div id="estimation" className="text-start mb-4 pb-1">
            <h3>Journey Details</h3>
            <div className="estimations flex flex-column flex-md-row mb-5">
                <div className="p-2 my-2 my-md-0 mx-md-1">Journey Duration:<br/><b>{duration}</b></div>
                <div className="p-2 my-2 my-md-0 mx-md-1">Total Distance:<br/><b>{distance} km</b></div>
            </div>
            <h3>Estimation</h3>
            <p className="fw-lighter">*select vehicle type to check estimate</p>
            <div className="estimations flex">
                <div className="p-2">Total estimated fare:<br/><b>&#8377;{estimation ? estimation : '-'}</b></div>
            </div>
        </div>
    </>
}