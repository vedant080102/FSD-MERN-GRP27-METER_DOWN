import React from "react";
import Navbar from "../base/Base";
import './home.css'
import logo from '../Media/logo.png'
import bgImg1 from '../Media/MUMBAI-TAXI-landscape.jpg'
import bgImg2 from '../Media/MUMBAI-Rick.jpg'
import { Parallax, Background } from "react-parallax";
import sprinkle from '../Media/purple-sprinkle.svg'
import mapImg from '../Media/map.svg'


function Home() {

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
                    <div className="container bg-white shadow rounded-3">
                        <div className='row mr-0 g-5 m-1 m-sm-5 pb-5'>
                            <div className="col-12">
                                <h3>Book a City Taxi to your destination in town</h3>
                                <p>Choose from a range of categories and prices</p>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='card p-1 p-md-4'>
                                    <div className="mb-3">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="inputGroup-sizing-default">Pickup</span>
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>                                    
                                    </div>
                                    <div className="mb-3">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="inputGroup-sizing-default">Drop</span>
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>                                    
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className="flex">
                                    <img src={mapImg} alt='map' height='150'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;