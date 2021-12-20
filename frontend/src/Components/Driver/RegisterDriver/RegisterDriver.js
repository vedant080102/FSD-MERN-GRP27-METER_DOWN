import React from "react";
import './RegisterDriver.css';

const RegisterDriver = () =>{
    return(
        <div className="container-fluid regdriv">
            <div className="container  rounded py-3 py-sm-5 px-sm-5 driverForm" style={{border:`4px solid var(--purple)`}}>
                <h3 className="fw-bold mt-3  text-black">Your Profile</h3>
                <div className="contanier bg-white  py-2 mb-3 " >
                    <hr className="myHr"/>
                    <form action="">
                        <div className="row">
                            <div className="col-lg-5">
                                <label htmlFor="image" className="drlabel" style={{textAlign:`center`}}>Profile Pic</label>
                                <div className="profPic">
                                    <div className="image-cropper m-auto">
                                        <img src={'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='profile-pic' />
                                    </div>
                                    <p><input type="file" name="image" style={{width:'100%', border:'black solid 1px',color:'black'}} className=' mt-2 p-1' id="image"  /></p>
                                </div>
                            </div>
                            <div className="col-lg-7 drinfo">
                                <label htmlFor="name" className="drlabel">Name</label><br />
                                <input type="text" className="drinput" id="name" disabled="true"/><br />

                                <label htmlFor="email" className="drlabel">Email</label><br />
                                <input type="text" className="drinput" id="email" /><br />

                                <label htmlFor="phone" className="drlabel">Phone</label><br />
                                <input type="tel" className="drinput" id="phone" /><br/>

                                <label htmlFor="vehno" className="drlabel">Vehicle Number</label><br />
                                <input type="text" className="drinput" id="vehno" /><br/>

                                <label htmlFor="vehtype" className="drlabel">Vehicle Type</label><br />
                                <div id="vehtype" className="drlabel">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                    <label class="form-check-label" for="inlineRadio1">Auto</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                    <label class="form-check-label" for="inlineRadio2">Taxi</label>
                                    </div>
                                </div><br />

                                <label htmlFor="permit" className="drlabel">Permit </label>
                                <input type="file" className="drfinput" id="permit" /><br/>

                                <label htmlFor="license" className="drlabel">License </label>
                                <input type="file" className="drfinput" id="license" /><br/>

                                <label htmlFor="registration" className="drlabel">Registration </label>
                                <input type="file" className="drfinput" id="registration" /><br/>
                                
                                <label htmlFor="vehimg" className="drlabel">Vehicle Images</label>
                                <div  id="vehimg">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                <p><input type="file" name="veh1" style={{width:'100%', border:'black solid 1px',color:'black'}} className=' mt-2 p-1' id="image"  /></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                <p><input type="file" name="veh1" style={{width:'100%', border:'black solid 1px',color:'black'}} className=' mt-2 p-1' id="image"  /></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                <p><input type="file" name="veh1" style={{width:'100%', border:'black solid 1px',color:'black'}} className=' mt-2 p-1' id="image"  /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="myHr"/>
                        <button type="submit" id="drSubmit">Update Information</button>
                    </form>
                </div> 
            </div>
        </div>
    );
}

export default RegisterDriver;