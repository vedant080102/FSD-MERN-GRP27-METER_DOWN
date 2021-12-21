import { useState } from "react"
import { useLocation } from "react-router-dom"
import '../home.css'
import { useEffect } from "react"
import { HashLink } from "react-router-hash-link"
import EstimatePrice from "./EstimatePrice"

function BookRide(props) {
    
    const location = useLocation()
    const [pickupLoc, setpickupLoc] = useState({});
    const [destinationLoc, setdestinationLoc] = useState({});
    const [noData, setnoData] = useState(false);
    
    const getLoc = () => {
        var pickup, destination;
        ({pickup, destination} = location.state)
        setnoData(true);
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

                    {/* <div className="text-start my-5">
                        <h3>Time</h3>
                        <p className="text-muted">Now</p>
                    </div> */}

                    <EstimatePrice pickup={pickupLoc} destination={destinationLoc}/>

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