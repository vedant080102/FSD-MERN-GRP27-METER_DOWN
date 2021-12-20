import { useState } from "react"
import { useLocation } from "react-router-dom"
import '../home.css'
import {ReactComponent as Rick} from '../../../Media/rickshaw.svg'
import {ReactComponent as Taxi} from '../../../Media/taxi.svg'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import EstimatePrice from "./EstimatePrice"

function BookRide(props) {
    
    const location = useLocation()
    var pickup; 
    var destination;
    const [pickupLoc, setpickupLoc] = useState({});
    const [destinationLoc, setdestinationLoc] = useState({});
    const [rideChosen, setrideChosen] = useState('');
    const [noData, setnoData] = useState(false);
    
    const selectRideChange = (e) => {
        var val = e.currentTarget.value;
        console.log(val)
        setrideChosen(val)
    }
    
    const getLoc = () => {
        setnoData(true);
        ({pickup, destination} = location.state)
        setpickupLoc(pickup);
        setdestinationLoc(destination);
        console.log("address: ", pickup, destination)
    }

    useEffect(()=> (location.state) ? getLoc() : setnoData(false), [location.state]);

    return (
        <div id="ride-booking" className="flex">
            <div className="yellow-bg rounded p-3 p-sm-5">
                {noData ? 
                <>
                    <h3 className="text-start">Ride Details</h3>
                    <div className="row m-0 flex">
                        <div className='col-10 my-2 locations mx-2 p-2 rounded text-start' data-bs-toggle="tooltip" data-bs-placement="right" title={pickupLoc.address}>
                            <div className="row w-100 m-0">
                                <div className="col-3 col-xl-2 p-0 px-2">Pickup:</div>
                                <div className="col-9">
                                    {pickupLoc.title ? <b>{pickupLoc.title}</b> : "Select pickup for estimation"}</div>
                            </div>
                        </div>
                        <div className='col-10 my-2 locations mx-2 p-2 rounded text-start' data-bs-toggle="tooltip" data-bs-placement="right" title={destinationLoc.address}>
                            <div className="row w-100 m-0">
                                <div className="col-3 col-xl-2 p-0 px-2">Drop:</div>
                                <div className="col-9">
                                    {destinationLoc.title ? <b>{destinationLoc.title}</b> : "Select drop for estimation"}</div>
                            </div>
                        </div>

                    </div>

                    <div className="text-start my-5">
                        <h3>Time</h3>
                        <p className="text-muted">Now</p>
                    </div>

                    <div id="rides"className="my-5">
                        <h3 className="text-start">Available Rides</h3>
                        <div className="row flex-start btn-group" role="group" aria-label="Basic radio toggle button group">
                            <div className="col-6">
                                <input type="radio" className="btn-check" value='Auto' name="rideType" id="rideType1" autocomplete="off" onChange={selectRideChange}/>
                                <label className="btn purple-btn rounded-pill border-2" for="rideType1">
                                    <Rick height='75'/>
                                    {/* <span>Get auto at your doorstep</span> */}
                                </label>
                            </div>
                            <div className="col-6">
                                <input type="radio" className="btn-check" value='Taxi' name="rideType" id="rideType2" autocomplete="off" onChange={selectRideChange}/>
                                <label className="btn purple-btn rounded-pill border-2" for="rideType2">
                                    <Taxi height='75'/>
                                    {/* <span>Comfy Taxi at pocket-friendly rates</span> */}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div id="estimation" className="text-start">
                        <EstimatePrice/>
                    </div>
                </> : <>
                    <h2>Provide <b>pickup</b> and <b>drop locations</b> to estimate prices,<br/> get journey details and much more</h2>
                    <HashLink to='/home#book-a-ride' className="purple-btn btn mt-4">Proceed to next step</HashLink>
                </>
                }
            </div>
        </div> 
    )
}

export default BookRide;