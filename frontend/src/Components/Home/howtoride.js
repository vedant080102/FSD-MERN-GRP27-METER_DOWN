import React from "react";
import './home.css'

// Popular Outstation Routes
const data = [
    {
        title: 'Request',
        details: `Open the app and enter your destination in the "Where to?" box. Once you confirm your pickup and destination addresses are correct, select Uber Taxi at the bottom of your screen. Then tap Confirm Uber Taxi.
            \nOnce you’ve been matched, you’ll see your driver’s picture and vehicle details and can track their arrival on the map.`
    }, {
        title: 'Ride',
        details: `Hop in when your driver arrives. Your driver has your destination and directions on the fastest route to get there, but you can always request a specific route.
        \nYou can also share your whereabouts and trip status with friends and family, all right from the app.
        \nIf you are riding with friends, you can also split the fares through the app. It’s easy and stress-free.`
    }, {
        title: 'Hop out',
        details: `You'll be automatically charged through your payment method on file, so you can exit your Uber Taxi as soon as you arrive.
        \nRemember to rate your driver at the end of the ride.`
    }   
]


function HowToRide() {
    const print = (doc, i) => <div className='col-12 col-md-4 text-start' key={i}>
        <h4 className='mb-4'>{doc.title}</h4>
        {doc.details}
    </div>

    return <>
        <div className="mx-2 mx-sm-0 container p-2 p-md-5 shadow" id='how-to-ride'>
            <h3 className='fw-bold'>
                How to ride with<br/>
                <span style={{fontFamily: 'var(--brandFont)'}}>METER DOWN</span>
            </h3>
            <div className='mt-2 mt-md-5 py-2 py-md-3 row'>
                {data.map((doc, i) => print(doc, i))}
            </div>
        </div>
    </>
}

export default HowToRide;