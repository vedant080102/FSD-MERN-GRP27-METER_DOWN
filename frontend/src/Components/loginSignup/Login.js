import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { Parallax, Background } from "react-parallax";
import bgImg from '../../Media/MUMBAI-TAXI-landscape.jpg'
import {Container,Form,Button} from 'react-bootstrap';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate } from "react-router-dom";

function Login() {

  const [phone,setphone] = useState("");
  const [pass,setpass] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) =>{
    e.preventDefault();
    const data = {
      phone : phone,
      password : pass
    }
    axiosInstance.post("/api/user/login",data,{withCredentials:true}).then((res)=>{
      console.log("User Logged in!!");
      navigate("/");
    }).catch((err)=>{
      console.log(err);
    })
  }
  
      return (
      <div>
        <div className="container-fluid bg">
          <div className="container login">
          <form onSubmit={submitHandler}>
            <h1 id="sign-head">Sign in</h1>New user? <a class="link" href="/signup" className="mylink">Create an account</a>
            <br></br>
            <br></br>
            {/* <label htmlFor="Email" className="mylabel">Email</label><br></br> */}
            <input className="myinput" type="tel" id="Phone" placeholder="   Phone Number" value={phone} onChange={(e)=>{setphone(e.target.value)}}/><br></br>
            <br></br>
            {/* <label htmlFor="pass" className="mylabel">Password</label><br></br> */}
            <input  className="myinput" type="password" id="pass" placeholder="   Password" value={pass} onChange={(e)=>{setpass(e.target.value)}}/><br></br>
            <br></br>
            <br></br>
            <button type="submit" id="submit">Login</button>
          </form>
          </div>
        </div> 
      </div>
    );
    
}

export default Login;