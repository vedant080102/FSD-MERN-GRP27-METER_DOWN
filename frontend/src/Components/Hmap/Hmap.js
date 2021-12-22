import React,{useState,useEffect} from 'react';
import { DisplayMapClass } from './Map/DisplayMapClass';
import './Hmap.css';
import GetAddress from '../Home/geocoding';
import axios from 'axios';
import { MyRoute } from './RouteMap/Route';


function Hmap() {

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

    const getLocationModal = (type, location, loc) => {
        setLocQuery({
            type: type,
            setLoc: location,
            currLoc: loc,
        })
        setModalShow(true)
    }

    useEffect(()=>{console.log(pickupLoc, destinationLoc)}, [pickupLoc, destinationLoc])

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;

    const getUserLoc = async() =>{
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
    
            await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${creds}&lang=en-US&apikey=${APP_CODE_HERE}`).then((data)=>{
                console.log(data.data.items[0]);
                setpickupLoc(data.data.items[0]);
            }).catch((err)=>{
                console.log(err);
            })
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
    useEffect(()=>{
        getUserLoc()
    },[1]);
    
    const mpHandler = (e) =>{
        e.preventDefault();
        setsourceLoc(pickupLoc.position);
        setdestLoc(destinationLoc.position);
        console.log(sourceLoc,destLoc);
        setshowMark(false);
        setshowRoute(true);
        document.getElementById("marker").style.display = "none";
        document.getElementById("mpBut").style.display = "none";
    }


    

return (
    <div>
        <div id="marker">
            {lat && lon?<DisplayMapClass lat={lat} lon={lon} />:<div></div>}
        </div>
        <div id="route">
            {sourceLoc && destLoc?<MyRoute lat={lat} lon={lon} source={sourceLoc} dest={destLoc}/>:<div></div>}
        </div>
        
    
      
        
        <div className='container-fluid srchB'>
            <div className='container bg-purple srchD rounded shadow'>
                
                <div className='row m-0 choose-locM p-2 my-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={pickupLoc.address}
                    onClick={() => getLocationModal('Pickup Location', setpickupLoc, pickupLoc)}>
                    <div className="col-3 col-xl-2 p-0 px-xl-2">
                            Your Location:
                    </div>
                    <div className="col-9">
                        {pickupLoc.title ? <span>{pickupLoc.title}</span> : "Select pickup location for your ride"}</div>
                </div>
                <div className='row m-0 choose-locM p-2 mb-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={destinationLoc.address}
                    onClick={() => getLocationModal('Drop Location', setdestinationLoc, destinationLoc)}>
                    <div className="col-3 col-xl-2 p-0 px-xl-2">
                        Destination Location:
                    </div>
                    <div className="col-9">
                        {destinationLoc.title ? <span>{destinationLoc.title}</span> : "Select drop location for your ride"}</div>
                </div>

                <button onClick={mpHandler} id="mpBut">Proceed</button>
            </div>
            <GetAddress locquery={locQuery} show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    </div>
);
}
export default Hmap;