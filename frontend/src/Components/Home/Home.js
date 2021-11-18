import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../base/Navbar";
import './home.css'
import logo from '../../Media/logo.png'
import bgImg1 from '../../Media/MUMBAI-TAXI-landscape.jpg'
import bgImg2 from '../../Media/MUMBAI-Rick.jpg'
import { Parallax, Background } from "react-parallax";
import sprinkle from '../../Media/purple-sprinkle.svg'
import mapImg from '../../Media/map.svg'
import * as LottiePlayer from "@lottiefiles/lottie-player";
import lottie from 'lottie-web'
import GetAddress from './geocoding';
import { set } from 'mongoose';

function Home() {

    const [modalShow, setModalShow] = useState(false);
    const [locQuery, setLocQuery] = useState({})
    const [pickupLoc, setpickupLoc] = useState({})
    const [destinationLoc, setdestinationLoc] = useState({})
    const hiddenRef = useRef();
    var animation;
    
    useEffect(()=> {
        animate();
    },[1]);
        
    useEffect(() => {
        window.addEventListener('scroll resize', scrollHandler);
        return () => window.removeEventListener('scroll resize', scrollHandler);
    }, []);
    
   const animate = () => {
        console.log("lottie animation")
        hiddenRef.current.innerHTML = '';
        animation = lottie.loadAnimation({
            container: hiddenRef.current,
            path: 'https://assets1.lottiefiles.com/packages/lf20_ZZ5gpp.json',
            renderer: 'svg',
            loop: false,
            // autoplay: false,
        })
        animation.pause()
    }
    
    const scrollHandler = () => {
        if(window.pageYOffset + window.innerHeight >= hiddenRef.current.offsetTop) {
            animation.play()
            console.log("element in VP")
        }
    }

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
                <div>
                    
                </div>
                <div id='book-a-ride' className='flex vh-100 py-2'>
                    <div className="container">
                        <div className='row bg-white shadow rounded-3 py-4 py-lg-5 px-md-4 mr-0 g-5 m-1 m-sm-5'>
                            <div className="col-12 mt-2 mt-md-1">
                                <h3>Book a City Taxi to your destination in town</h3>
                                <p>Choose from a range of categories and prices</p>
                            </div>
                            <div className='col-12 col-md-6 mt-2 mt-md-1'>
                                <div className='card p-3 p-md-4 w-100 h-100' id='location-card'>
                                    <div className="mb-3">
                                    <div class="row-sm ptr">
                                        <div onClick={() => getLocationModal('Pickup Location', setpickupLoc, pickupLoc)}>Pickup location</div>
                                        <div>location</div>
                                        <div onClick={() => getLocationModal('Destination Location', setdestinationLoc, destinationLoc)}>Destination location</div>
                                    </div>
                                        <label>Email address</label>
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
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
                                    <div ref={hiddenRef} id='select-route'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex vh-100 py-2'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, placeat voluptatibus! Repudiandae pariatur illo minus quisquam vitae quibusdam tenetur eligendi sunt iure atque. In veritatis non fuga autem cumque, explicabo iure dolorem, placeat, necessitatibus totam accusantium. Harum soluta illo atque quia eaque molestiae id reprehenderit deleniti numquam, saepe, optio ex! Illum veniam ducimus adipisci ipsum sequi perferendis minus, mollitia laboriosam rerum delectus molestiae, quidem vel sed hic beatae doloremque veritatis odio magni similique culpa modi eveniet deleniti iste. Pariatur omnis, aliquam eligendi ullam, earum quidem voluptatum et odio magni cumque provident nesciunt ipsam tempore nostrum voluptatibus quae repudiandae eveniet neque dicta minus vel numquam explicabo dignissimos? Omnis natus qui necessitatibus ipsam dolore doloremque culpa blanditiis sed molestias illo! Repellendus, animi. Perspiciatis, tempora!
                </div>

                <GetAddress locQuery={locQuery} show={modalShow} onHide={() => setModalShow(false)}/>
            </main>
        </>
    )
}

export default Home;