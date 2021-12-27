import React,{useState,useEffect} from 'react';
import { DisplayMapClass } from './Map/DisplayMapClass';
import './ride.css';
import GetAddress from '../base/geocoding';
import axios from 'axios';
import { axiosInstance } from '../../AxiosSetUp';
import { MyRoute } from './RouteMap/Route';
import Maptest from './Map/maptest';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import socket from '../../socket';
const humanizeDuration = require("humanize-duration");

function Hmap(props) {

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

    const journeyAddresses = useSelector((state)=> state.journeyAddresses.addresses);

    const [modalShow, setModalShow] = useState(false)
    const [locQuery, setLocQuery] = useState({})
    const [pickupLoc, setpickupLoc] = useState({})
    const [destinationLoc, setdestinationLoc] = useState({})
    const [lat,setlat] = useState("")
    const [lon,setlon] = useState("")
    const [sourceLoc,setsourceLoc] = useState()
    const [destLoc,setdestLoc] = useState()
    const [showRoute,setshowRoute] =useState(false)
    const [showMark,setshowMark] = useState(true)
    const [refresh,setrefresh] =useState(true);
    const [toggle,settoggle] = useState(true);
    const [duration,setduration] = useState();
    const [distance,setdistance] = useState();
    const [autoF,setautoF] = useState();
    const [taxiF,settaxiF] = useState();

   

    const getLocationModal = (type, location, loc) => {
        setLocQuery({
            type: type,
            setLoc: location,
            currLoc: loc,
        })
        setModalShow(true)
    }

    const navigate = useNavigate();


    useEffect(()=>{console.log(pickupLoc, destinationLoc)}, [pickupLoc, destinationLoc])

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;

    const refreshMap =()=>{
        setrefresh(!refresh);
    }

    const getUserLoc = async(setData) =>{
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          const success = async(pos) => {
            var crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            setlat(String(crd.latitude));
            setlon(String(crd.longitude));
            console.log(lat,lon);
            
            setshowMark(true);
            
            const creds = String(crd.latitude) + String('%2C') + String(crd.longitude);
            console.log(creds)
    
           

            try {
                var data =await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${creds}&lang=en-US&apikey=${APP_CODE_HERE}`) 
                console.log(data.data.items[0].label);
                setData(data.data.items[0]);
                mpHandler();
                

            } catch (error) {
                console.log(error);
            }
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
    useEffect(()=>{
        getUserLoc()
    },[1]);
    
    const mpHandler = async(e) =>{
        //e.preventDefault();
        await setsourceLoc(pickupLoc.position);
        await setdestLoc(destinationLoc.position);
        console.log(sourceLoc,destLoc);
        setshowMark(false);
        if(showRoute==false){
            await setshowRoute(true);
        }
        await settoggle(!toggle)
        console.log("proceeded")
        // document.getElementById("marker").style.display = "none";
        // document.getElementById("mpBut").style.display = "none";
    }

    const estimateH = async() => {
        await axios.get('https://router.hereapi.com/v8/routes', {
            'params': {
                'apiKey': APP_CODE_HERE,
                'origin': `${pickupLoc.position.lat},${pickupLoc.position.lng}`,
                'destination': `${destinationLoc.position.lat},${destinationLoc.position.lng}`,
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
        }).catch((e)=> console.log(e));

        //getTaxiFare();
        document.getElementById("mdRide").style.display="block";
        
    }

    const getTaxiFare = async() =>{
        await axiosInstance.get(`/api/passenger/priceEstimate?time=day&type=Taxi&distance=${distance}`, { withCredentials: true })
        .then((data) => {
            console.log("estimation:", data.data.price);
            settaxiF(data.data.price);
        }).catch(e=> console.log(e.response));
    }

    const getAutoFare = async() =>{
        await axiosInstance.get(`/api/passenger/priceEstimate?time=day&type=Auto&distance=${distance}`, { withCredentials: true })
        .then((data) => {
            console.log("estimation:", data.data.price);
            setautoF(data.data.price);
        }).catch(e=> console.log(e.response));
    }

    const book = async(e) =>{
        console.log(e)
        const apiData = {}
        const dur = duration.slice(0,3);
        
        console.log(dur);
        apiData["source"] = {"lat":pickupLoc.position.lat,"lng":pickupLoc.position.lng,"address":pickupLoc.title}
        apiData["destination"] = {"lat":destinationLoc.position.lat,"lng":destinationLoc.position.lng,"address":destinationLoc.title}
        apiData["distanceEstimate"] = Number(distance)
        apiData["timeEstimate"] = Number(dur)
        if(e=="auto"){
            apiData["fareEstimate"] = autoF
            apiData["vehicleType"] = "Auto"
        }else{
            apiData["fareEstimate"] = taxiF
            apiData["vehicleType"] = "Taxi"
        }
        apiData["time"] = "day"
        apiData["startType"] = "now"
        console.log(apiData);

        await axiosInstance.post(`/api/passenger/bookRide`,apiData,{withCredentials:true}).then((res)=>{
            console.log(res);
            console.log("Worked");
            navigate('/ride-summary')
        }).catch((e)=>{
            console.log(e);
        });
    }

    

    // useEffect(()=>{
    //     socket.on("allottedPassenger",(data)=>{
    //         console.log("allotted")
    //         console.log(data)
    //         navigate('/');
    //         // setRide(data.fareid)
    //       })
    // },[])

    useEffect(()=>{
        getTaxiFare()
    // },[distance]);

    // useEffect(()=>{
        getAutoFare()
    },[distance]);

    useEffect(()=>{
            if(journeyAddresses) {
                setpickupLoc(journeyAddresses.pickup)
                setdestinationLoc(journeyAddresses.destination)
                console.log("props",journeyAddresses.pickup, journeyAddresses.destination);
                mpHandler();
                // setlat(String(crd.latitude));
                // setlon(String(crd.longitude));
                // console.log(lat,lon);
                
                setshowMark(true);
            }
        },[journeyAddresses])
    

return (
    <div>
        <div id="marker" key={toggle}>
            {lat && lon?<DisplayMapClass lat={lat} lon={lon} setCL={setpickupLoc} setDL={setdestinationLoc} source={pickupLoc.position} dest={destinationLoc.position} route={showRoute} setroute={setshowRoute} chngR={mpHandler} />:<div></div>}
        </div>

        {/* <div>
            <Maptest lat={lat} lon={lon} setCL={setpickupLoc} setDL={setdestinationLoc} source={sourceLoc} dest={destLoc} route={showRoute} setroute={setshowRoute} />
        </div> */}
        {/* <div id="route">
            {sourceLoc && destLoc?<MyRoute lat={lat} lon={lon} source={sourceLoc} dest={destLoc}/>:<div></div>}
        </div> */}
        
    
      
        
        <div className='container-fluid srchB'>
            <div className='container bg-purple srchD rounded shadow'>
                <div className='row m-0 choose-locM p-2 my-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={pickupLoc.address}>
                    <div className="col-3 col-xl-2 p-0 px-xl-2">
                            Pickup:
                    </div>
                    <div className="col" onClick={() => getLocationModal('Pickup Location', setpickupLoc, pickupLoc)}>
                        {pickupLoc.title ? pickupLoc.title : "Select pickup location for your ride"}</div>                        
                    <div className="col-auto">
                        <button className='btn purple-btn' onClick={()=>{getUserLoc(setpickupLoc)}}><i class="fas fa-location-arrow"></i></button>
                    </div>
                </div>

                <div className='row m-0 choose-locM p-2 mb-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={destinationLoc.address}>
                    <div className="col-3 col-xl-2 p-0 px-xl-2">
                        Drop:
                    </div>
                    <div className="col" onClick={() => getLocationModal('Drop Location', setdestinationLoc, destinationLoc)}>
                        {destinationLoc.title ? destinationLoc.title : "Select drop location for your ride"}</div>
                    <div className="col-auto">
                        <button className='btn purple-btn' onClick={()=>{getUserLoc(setdestinationLoc)}}><i class="fas fa-location-arrow"></i></button>
                    </div>
                </div>

                <br /><br />

                <div id='mdRide'>
                <div onClick={()=>{book("auto")}} className='row mdrides shadow' value="AUTO">
                    <div className='col-lg-4 col-md-2 col-sm-2 col-2 mdauto' >

                    </div>
                    <div className='col-lg-4 col-md-5 col-sm-5 col-5'>
                        <b>Auto</b><br></br>
                        Estimated Time: <b>{duration}</b>
                    </div>
                    <div className='col-lg-4 col-md-5 col-sm-5 col-5'>
                        Estimated Fare: <b>{autoF}</b><br />
                        Estimated Distance: <b>{distance} km</b>
                    </div>

                </div>  
                <div onClick={()=>{book("taxi")}} className='row mdrides shadow'>
                    <div className='col-lg-4 col-md-2 col-sm-2 col-2 mdtaxi'>

                    </div>
                    <div className='col-lg-4 col-md-5 col-sm-5 col-5'>
                        <b>Taxi</b><br />
                        Estimated Time: <b>{duration}</b>
                    </div>
                    <div className='col-lg-4 col-md-5 col-sm-5 col-5'>
                        Estimated Fare: <b>{taxiF}</b><br />
                        Estimated Distance: <b>{distance} km</b>
                    </div>

                </div> 
                </div>  

                <button onClick={estimateH}  id="mpBut">Proceed</button>
            </div>
            <GetAddress locquery={locQuery} show={modalShow} changeMarker={mpHandler} onHide={() => setModalShow(false)}/>
            
        </div>
        
        
    </div>
);
}
export default Hmap;