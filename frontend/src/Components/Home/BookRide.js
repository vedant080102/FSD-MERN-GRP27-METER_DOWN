import { useState } from "react"
import { useLocation } from "react-router-dom"
import './home.css'
import {ReactComponent as Rick} from '../../Media/rickshaw.svg'
import {ReactComponent as Taxi} from '../../Media/taxi.svg'

function BookRide(props) {
    
    const location = useLocation()
    const { pickup, destination } = location.state
    const [pickupLoc, setpickupLoc] = useState(pickup);
    const [rideChosen, setrideChosen] = useState('');
    const [destinationLoc, setdestinationLoc] = useState(destination);
    
    const selectRideChange = (e) => {
        var val = e.currentTarget.value;
        console.log(val)
        setrideChosen(val)
    }
    // console.log("address: ", pickup, destination)

    return (
        <div id="ride-booking" className="flex">
            <div className="container yellow-bg rounded p-2 p-md-5">
                <h3 className="text-start">Ride Details</h3>
                <div className="row m-0">
                    <div className='col-12 col-lg-5 locations mx-2 p-2 rounded text-start' data-bs-toggle="tooltip" data-bs-placement="right" title={pickupLoc.address}>
                        <div className="row w-100 m-0">
                            <div className="col-3 col-xl-2 p-0 px-2">
                                Pickup:
                            </div>
                            <div className="col-9">
                                {pickupLoc.title ? <span>{pickupLoc.title}</span> : "Select pickup for estimation"}</div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5 locations mx-2 p-2 rounded text-start' data-bs-toggle="tooltip" data-bs-placement="right" title={destinationLoc.address}>
                        <div className="row w-100 m-0">
                            <div className="col-3 col-xl-2 p-0 px-2">
                                Drop:
                            </div>
                            <div className="col-9">
                                {destinationLoc.title ? <span>{destinationLoc.title}</span> : "Select drop for estimation"}</div>
                        </div>
                    </div>

                </div>

                <div className="text-start my-5">
                    <h3>Time</h3>
                    <p className="text-muted">Now</p>
                </div>

                <div id="rides"className="my-5">
                    <h3 className="text-start">Available Rides</h3>
                    <div class="row flex-start btn-group w-100" role="group" aria-label="Basic radio toggle button group">
                        <div className="col-12 col-md-6">
                            <input type="radio" class="btn-check" value='Auto' name="rideType" id="rideType1" autocomplete="off" onChange={selectRideChange}/>
                            <label class="btn purple-btn" for="rideType1">
                                <Rick height='75'/> Get auto at your doorstep
                            </label>
                        </div>
                        <div className="col-12 col-md-6">
                            <input type="radio" class="btn-check" value='Taxi' name="rideType" id="rideType2" autocomplete="off" onChange={selectRideChange}/>
                            <label class="btn purple-btn" for="rideType2">
                                <Taxi height='75'/> Comfy Taxi at pocket-friendly rates
                            </label>
                        </div>
                    </div>
                </div>

                <div id="estimation" className="text-start">
                    <h3>Estimation</h3>
                    <div className="row">
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default BookRide;