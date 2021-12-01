import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { Parallax, Background } from "react-parallax";
import bgImg from '../../Media/MUMBAI-TAXI-landscape.jpg'
import {Container,Form,Button} from 'react-bootstrap';

function Login() {
  
      return (
      <div>
        <div className="container-fluid bg">
          <div className="container login">
          <form>
            <h1 id="sign-head">Sign in</h1>New user? <a class="link" href="/signup" className="mylink">Create an account</a>
            <br></br>
            <br></br>
            <label htmlFor="Email" className="mylabel">Email</label><br></br>
            <input className="myinput" type="text" id="Email" /><br></br>
            <br></br>
            <label htmlFor="pass" className="mylabel">Password</label><br></br>
            <input  className="myinput" type="password" id="pass"/><br></br>
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