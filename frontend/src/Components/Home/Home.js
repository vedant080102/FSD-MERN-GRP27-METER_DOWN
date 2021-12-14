import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../base/Navbar";
import './home.css'
import logo from '../../Media/logo.png'
import bgImg1 from '../../Media/MUMBAI-TAXI-landscape.jpg'
import bgImg2 from '../../Media/MUMBAI-Rick.jpg'
import { Parallax, Background } from "react-parallax";
// import sprinkle from '../../Media/purple-sprinkle.svg'
// import mapImg from '../../Media/map.svg'
import {ReactComponent as Rick} from '../../Media/rickshaw.svg'
import {ReactComponent as Taxi} from '../../Media/taxi.svg'
import lottie from "lottie-web/build/player/lottie_light";
import GetAddress from './geocoding';
import PopularRoutes from './PopularRoutes.js'
import HowToRide from './howtoride';


function Home() {

    const [modalShow, setModalShow] = useState(false);
    const [locQuery, setLocQuery] = useState({})
    const [pickupLoc, setpickupLoc] = useState({})
    const [destinationLoc, setdestinationLoc] = useState({})
    const routeAnimationRef = useRef();
    var animation;
    
    const animate = () => {
        console.log("lottie animation")
        routeAnimationRef.current.innerHTML = '';
        animation = lottie.loadAnimation({
            container: routeAnimationRef.current,
            name: 'route-svg',
            path: 'https://assets1.lottiefiles.com/packages/lf20_ZZ5gpp.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
        })
        animation.pause('route-svg')
    }
    
    useEffect(()=> animate(), [1])
    
    const scrollHandler = () => {
        if(window.pageYOffset + window.innerHeight >= routeAnimationRef.current.offsetTop) {
            // console.log("element in VP")
            animation.play('route-svg')
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])
        
    const getLocationModal = (type, location, loc) => {
        setLocQuery({
            type: type,
            setLoc: location,
            currLoc: loc,
        })
        setModalShow(true)
    }

    useEffect(()=>{console.log(pickupLoc, destinationLoc)}, [pickupLoc, destinationLoc])
    

    return(
        <>
            <header className='home-header'>
                <div className='position-absolute vw-100 vh-100'>
                    {/* <Parallax bgImage={bgImg} strength={300}>
                        <div style={{ height: '100vh', width: '100vw' }}>
                            <div className='home-logo'>
                                <img src={logo} width='200'/>
                                <span>METER DOWN</span>
                            </div>
                        </div>
                    </Parallax> */}
                    <Parallax strength={500} className='w-100 h-100'>
                        <Background className="custom-bg">
                            <div style={{
                                height: '100vh',
                                width: '100vw',
                                backgroundImage: `linear-gradient(#2b0a2ca6, #2b0a2ca6), url(${bgImg1}), url(${bgImg2})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                animation: '30s parallel infinite linear',
                            }}
                            />
                        </Background>
                    </Parallax>
                    <div className='home-logo'>
                        <img src={logo} width='200' alt='meter down'/>
                        <span>METER DOWN</span>
                    </div>
                </div>
                
                <Navbar homepage={true} />
            </header>

            <main className='home-main'>
                <div className="custom-shape-divider-top-1636559095">
                    {/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                    </svg> */}
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                        {/* <defs>
                            <pattern id="img1" patternUnits="userSpaceOnUse" width="1440" height="560">
                                <image href={sprinkle} x="0" y="0" width="1440" height="560"/>
                                <div x='0' y='0' style={{
                                    width: "1440px",
                                    height: "560px",
                                    backgroundImage: `url(${sprinkle})`,
                                    // backgroundSize: 'cover',
                                    // backgroundPosition: 'center',
                                }}></div>
                            </pattern>
                        </defs> */}
                    </svg>
                </div>
                
                <div id='book-a-ride' className='flex min-vh-100 py-2'>
                    <div className="container">
                        <div className='row bg-white shadow rounded-3 py-4 py-lg-5 px-md-4 mr-0 g-5 m-1 m-sm-5'>
                            <div className="col-12 mt-2 mt-md-1">
                                <h3>Book a City Taxi to your destination in town</h3>
                                <p>Local taxis at the tap of a button</p>
                            </div>
                            <div className='col-12 col-md-6 mt-2 mt-md-1'>
                                <div className='card justify-content-betwee p-3 p-md-4 w-100 h-100' id='location-card'>
                                    <h5>Need a taxi?<br/>Request a ride from your phone with <br/>METER DOWN</h5>
                                    <div className='row m-0 choose-location p-2 mb-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={pickupLoc.address}
                                        onClick={() => getLocationModal('Pickup Location', setpickupLoc, pickupLoc)}>
                                            <div className="col-3 col-xl-2 p-0 px-xl-2">
                                                Pickup:
                                            </div>
                                            <div className="col-9">
                                                {pickupLoc.title ? <span>{pickupLoc.title}</span> : "Select pickup for estimation"}</div>
                                            </div>
                                    <div className='row m-0 choose-location p-2 my-2 rounded' data-bs-toggle="tooltip" data-bs-placement="right" title={destinationLoc.address}
                                        onClick={() => getLocationModal('Drop Location', setdestinationLoc, destinationLoc)}>
                                            <div className="col-3 col-xl-2 p-0 px-xl-2">
                                                Drop:
                                            </div>
                                            <div className="col-9">
                                                {destinationLoc.title ? <span>{destinationLoc.title}</span> : "Select drop for estimation"}</div>
                                            </div>
                                    <div className="w-100 flex">
                                        <button className='buton yellow-btn mt-2 center'>Search Rides</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 mt-3 mt-md-1'>
                                <div className="flex">
                                    {/* <img src={mapImg} alt='map' height='150'/> */}
                                    {/* <lottie-player
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="https://assets1.lottiefiles.com/packages/lf20_ZZ5gpp.json"
                                        style={{width: "320px"}}
                                    ></lottie-player> */}
                                    <div ref={routeAnimationRef} id='select-route'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='vw-100 vh-100 position-relative'>
                    <Parallax strength={500} className='w-100 h-100'
                        renderLayer={(percentage) => (
                            <div className='rounded-pill'
                                style={{
                                position: "absolute",
                                background: `rgba(255, 207, 21, ${percentage * 1})`,
                                left: "50%",
                                top: "50%",
                                zIndex: '1',
                                // borderRadius: "50%",
                                transform: "translate(-50%,-50%)",
                                width: percentage * 850,
                                height: percentage * 400
                                }}
                            />
                        )}>
                        <Background className="custom-bg">
                            <div style={{
                                height: '100vh',
                                width: '100vw',
                                backgroundImage: `linear-gradient(#2b0a2ca6, #2b0a2ca6), url(${bgImg2})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}/>
                        </Background>
                    </Parallax>
                    <div className='w-100 flex' style={{position: 'absolute', top: '27%', zIndex: '2'}}>
                        <div className='rounded-pill fw-bold fs-2 p-5 my-5' style={{backgroundColor: 'var(--yellow)', color: 'var(--purple)'}}>
                            Redefining Mobility for Billions
                            <br/>
                            {/* <img src={Rick} alt='rickshaw' height='150'/> */}
                            {/* <img src={Taxi} alt='taxi' height='150'/> */}
                            <Rick height='150'/>
                            <Taxi height='150'/>
                        </div>
                    </div>
                </div>

                <div className='flex min-vh-100 py-2 how-to'>
                    <HowToRide/>
                </div>

                <GetAddress locQuery={locQuery} show={modalShow} onHide={() => setModalShow(false)}/>
            </main>
        </>
    )
}

export default Home;