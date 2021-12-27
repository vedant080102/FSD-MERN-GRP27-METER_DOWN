import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../AxiosSetUp";
import { useSelector } from 'react-redux'
import './RegisterDriver.css';

const RegisterDriver = () =>{

    const [driverInfo,setdriverInfo] = useState("")
    const [ vehN,setvehN ] = useState("");
    const [ permit,setpermit ] = useState("");
    const [ liscence,setliscence ] = useState("");
    const [ registration,setregistration ] = useState("");
    const [ driverPhoto,setdriverPhoto ] = useState("");
    const [ type,settype ] = useState("");
    const [ carPhoto,setcarPhoto ] = useState([]);

    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    const getDriver = async() => {
        const driver = await axiosInstance.get("/api/driver/getonedriverdata",{ withCredentials:true });
        console.log(driver.data);
        setdriverInfo(driver.data.data);
        setvehN(driver.data.data.vehicleNumber);
        settype(driver.data.data.vehicleType);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(type)
        const formData = new FormData();
        formData.append('vehicleNumber',vehN);
        formData.append('permit',permit);
        formData.append('liscence',liscence);
        formData.append('registration',registration);
        formData.append('driverPhoto',driverPhoto);
        formData.append('vehicleType',type);
        
        for(var i=0;i<carPhoto.length;i++){
            console.log(carPhoto[i]);
            formData.append('carPhoto',carPhoto[i])
        }

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        
        axiosInstance.post("/api/driver/updateDriverInfo",formData ,{ withCredentials:true }).then((rs)=>{
            console.log(rs.data);
            window.location.reload(false);
        }).catch((er)=>{
            console.log(er.data);
        });

    }

    useEffect(()=>{
        getDriver()
    },[1]);

    useEffect(()=>{
        console.log(driverInfo.vehicleType);  
    },[driverInfo])

    useEffect(()=>{
        console.log(vehN);
    },[getDriver])

    return(
        <div className="container-fluid regdriv">
            <div className="container rounded py-3 py-sm-5 px-sm-5 driverForm" style={{border:`4px solid var(--purple)`}}>
                <h3 className="fw-bold mt-3  text-black">Your Profile</h3>
                <div className="contanier bg-white  py-2 mb-3 " >
                    <hr className="myHr"/>
                    <form onSubmit={submitHandler} id="myForm">
                        <div className="row">
                            <div className="col-lg-5">
                                <label htmlFor="driverPhoto"  className="drlabel" style={{textAlign:`center`}}>Profile Pic</label>
                                <div className="profPic">
                                    <div className="image-cropper m-auto">
                                        <img src={driverInfo.driverPhoto || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} alt="profile Pic" className='profile-pic' />
                                    </div>
                                    <p><input type="file" name="driverPhoto" onChange={(e)=>{setdriverPhoto(e.target.files[0])}} style={{width:'100%', border:'black solid 1px',color:'black'}} className='form-control mt-2' id="image"  /></p>
                                </div>
                            </div>
                            <div className="col-lg-7 drinfo rounded">
                                <label htmlFor="name" className="drlabel">Name</label><br />
                                <input type="text" name="Name" value={user.name} className="drinput" id="name" disabled={true}/><br />

                                <label htmlFor="email" className="drlabel">Email</label><br />
                                <input type="text" name="Email" value={user.email} className="drinput" id="email" disabled={true} /><br />

                                <label htmlFor="phone" className="drlabel">Phone</label><br />
                                <input type="tel" name="Phone" value={user.phone} className="drinput" id="phone" disabled={true} /><br/>

                                <label htmlFor="vehno" className="drlabel">Vehicle Number</label><br />
                                <input type="text" name="vehicleNumber" defaultValue={driverInfo.vehicleNumber} onChange={(e)=>{setvehN(e.target.value)}} className="drinput" id="vehno" /><br/>

                                {driverInfo.vehicleType==="Taxi"?
                                <div><label htmlFor="vehtype" className="drlabel">Vehicle Type</label><br />
                                <div id="vehtype" className="drlabel">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" value="Auto" name="inlineRadioOptions" id="inlineRadio1" onChange={(e)=>{settype(e.target.value)}}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Auto</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Taxi" onChange={(e)=>{settype(e.target.value)}} checked/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Taxi</label>
                                </div>
                                </div><br /></div>:
                                <div><label htmlFor="vehtype" className="drlabel">Vehicle Type</label><br />
                                <div id="vehtype" className="drlabel">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" value="Auto" name="inlineRadioOptions" id="inlineRadio1" onChange={(e)=>{settype(e.target.value)}} checked/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Auto</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Taxi" onChange={(e)=>{settype(e.target.value)}}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Taxi</label>
                                </div>
                                </div><br /></div>
                                }
                                

                                <label htmlFor="permit" className="drlabel">Permit </label><br />
                                {driverInfo.permit? 
                                <div className="drPreview">
                                    <span>Preview Permit : <a href={driverInfo.permit} className="drPreview" rel="noreferrer" target="_blank">Here</a></span><br/>
                                    Update : <input type="file" name="permit" defaultValue={permit}  onChange={(e)=>{setpermit(e.target.files[0])}} className="drfinput form-control" id="permit" />
                                </div>
                            
                                : <input type="file" name="permit" defaultValue={permit}  onChange={(e)=>{setpermit(e.target.files[0])}} className="drfinput form-control" id="permit" />}
                               
                               <br/>

                                <label htmlFor="license" className="drlabel">License </label><br />
                                {driverInfo.liscence? 
                                <div className="drPreview">
                                    <span>Preview liscence : <a href={driverInfo.liscence} className="drPreview" rel="noreferrer" target="_blank">Here</a></span><br/>
                                    Update : <input type="file" name="permit" defaultValue={liscence}  onChange={(e)=>{setliscence(e.target.files[0])}} className="drfinput form-control" id="liscence" />
                                </div>
                            
                                : <input type="file" name="permit" defaultValue={liscence}  onChange={(e)=>{setliscence(e.target.files[0])}} className="drfinput form-control" id="liscence" />}
                                <br />

                                <label htmlFor="registration" className="drlabel">Registration </label><br />
                                {driverInfo.registration? 
                                <div className="drPreview">
                                    <span>Preview registration : <a href={driverInfo.registration} className="drPreview" rel="noreferrer" target="_blank">Here</a></span><br/>
                                    Update : <input type="file" name="registration" defaultValue={registration}  onChange={(e)=>{setregistration(e.target.files[0])}} className="drfinput form-control" id="registration" />
                                </div>
                            
                                : <input type="file" name="registration" defaultValue={registration}  onChange={(e)=>{setregistration(e.target.files[0])}} className="drfinput form-control" id="registration" />}
                                <br />
                                <label htmlFor="carP" className="drlabel">Vehicle Images</label>
                                <div  id="vehimg">
                                    <div className="row">
                                        {driverInfo.carPhoto?
                                        driverInfo.carPhoto.map((e)=>(
                                            <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    
                                                    <img src={e}  className='profile-pic' alt="profile-pic"/>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        )):<div>
                                            <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="profPic">
                                                <div className="vehImage m-auto">
                                                    <img src={'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/505/Mid-Size_Car_Front_View-512.png'} alt="profile Pic" className='profile-pic' />
                                                </div>
                                                
                                            </div>
                                        </div>
                                            </div>}
                                        
                                    </div>
                                    <p><input type="file" name="carPhoto" style={{width:'100%', border:'black solid 1px',color:'black'}} className='form-control mt-2 drfinput' id="carP" onChange={(e)=>{setcarPhoto(e.target.files)}}  multiple={true}/></p>
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