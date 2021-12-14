import React from "react";
import './login.css'

function Signup() {
    return(
       
        <div>
        <div className="container-fluid bg">
          <div className="container login">
          <form>
            <h1 id="sign-head">Sign Up</h1>Already have a account? <a class="link" href="/login">Sign In</a>
            <br></br>
            <br></br>
            <label htmlFor="Name">Name</label><br></br>
            <input type="text" className="myinput" id="Name" /><br></br>
            <br></br>
            <label htmlFor="Email">Email</label><br></br>
            <input type="text" className="myinput" id="Email" /><br></br>
            <br></br>
            <label htmlFor="pass">Password</label><br></br>
            <input type="password"  className="myinput" id="pass"/><br></br>
            <br></br>
            <label htmlFor="contact">Contact No.</label><br></br>
            <input type="tel" className="myinput" id="contact"/><br></br>
            <br></br>
            <br></br>
            <button type="submit" id="submit">Login</button>
          </form>
          </div>
        </div>
      </div>
   
    )
}

export default Signup;