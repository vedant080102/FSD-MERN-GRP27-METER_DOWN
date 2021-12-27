import React from "react";
import './Bookings.css';

function Bookings() {
    return (
        <div id="bookings" className=" vh-100 py-2">
            <div className="container">
               
                <div className="row">
                    <div className="col-lg-6 col-md-5 booksvg">
                        {/* <RouteSvg height='60vh'/> */}
                    </div>
                    <div className="col-lg-6 col-md-12 col-12 mybook shadow rounded p-3">
                        <h1>Your Rides</h1>
                        <br />
                        <div className="container-fluid myrides pb-3">

                        
                        <div class="card rideind shadow">
                        <div class="card-header ">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 autoR">

                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <b>Friday, 10th Sept 2021</b>
                                </div>
                            </div>
                        </div>
                        <div class="card-body shadow">
                            <div className="row rideinf"> 
                                <div className="col-lg-9 col-md-9">
                                    <div className="w-100 srcinfo source">
                                        A-14,Rameshwar CHS, Premnagar, Kharegaon
                                    </div>
                                    <div className="w-100 srcinfo destn">
                                        KJ Somaiya, Vidyanagar, Vidyavihar(E), Mumbai
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                    <b>102 $</b><br />
                                    <button className="mybtn purple-btn">More Info</button>
                                </div>
                            </div>
                            {/* <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        </div>
                        
                        <div class="card rideind">
                        <div class="card-header ">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 autoR">

                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <b>Friday, 10th Sept 2021</b>
                                </div>
                            </div>
                        </div>
                        <div class="card-body shadow">
                            <div className="row rideinf"> 
                                <div className="col-lg-9 col-md-9">
                                    <div className="w-100 srcinfo source">
                                        A-14,Rameshwar CHS, Premnagar, Kharegaon
                                    </div>
                                    <div className="w-100 srcinfo destn">
                                        KJ Somaiya, Vidyanagar, Vidyavihar(E), Mumbai
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                    <b>102 $</b><br />
                                    <button className="mybtn purple-btn">More Info</button>
                                </div>
                            </div>
                            {/* <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        </div>

                        <div class="card rideind">
                        <div class="card-header ">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 autoR">

                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <b>Friday, 10th Sept 2021</b>
                                </div>
                            </div>
                        </div>
                        <div class="card-body shadow">
                            <div className="row rideinf"> 
                                <div className="col-lg-9 col-md-9">
                                    <div className="w-100 srcinfo source">
                                        A-14,Rameshwar CHS, Premnagar, Kharegaon
                                    </div>
                                    <div className="w-100 srcinfo destn">
                                        KJ Somaiya, Vidyanagar, Vidyavihar(E), Mumbai
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                    <b>102 $</b><br />
                                    <button className="mybtn purple-btn">More Info</button>
                                </div>
                            </div>
                            {/* <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        </div>
                        <div class="card rideind">
                        <div class="card-header ">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2 autoR">

                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                    <b>Friday, 10th Sept 2021</b>
                                </div>
                            </div>
                        </div>
                        <div class="card-body shadow">
                            <div className="row rideinf"> 
                                <div className="col-lg-9 col-md-9">
                                    <div className="w-100 srcinfo source">
                                        A-14,Rameshwar CHS, Premnagar, Kharegaon
                                    </div>
                                    <div className="w-100 srcinfo destn">
                                        KJ Somaiya, Vidyanagar, Vidyavihar(E), Mumbai
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                    <b>102 $</b><br />
                                    <button className="mybtn purple-btn">More Info</button>
                                </div>
                            </div>
                            {/* <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        </div>
                          
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    )
}

export default Bookings;