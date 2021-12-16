import React from "react";
import './login.css'

function Signup() {
    return(
       
        <div>
        <div className="container-fluid bg">
          <div className="container signup">
          <form>
            <h1 id="sign-head">Sign Up</h1>Already have a account? <a class="link" className="mylink" href="/login">Sign In</a>
            <br></br>
            <br></br>
            {/* <label htmlFor="Name">Name</label><br></br> */}
            <input type="text" className="myinput" id="Name" placeholder="  Name"/><br></br>
            <br></br>
            {/* <label htmlFor="Email">Email</label><br></br> */}
            <input type="text" className="myinput" id="Email" placeholder="  Email" /><br></br>
            <br></br>
            {/* <label htmlFor="pass">Password</label><br></br> */}
            <input type="password"  className="myinput" id="pass" placeholder="  Password"/><br></br>
            <br></br>
            {/* <label htmlFor="contact">Contact No.</label><br></br> */}
            <input type="tel" className="myinput" id="contact" placeholder="  Contact Number"/><br></br>
            <br></br>
            <div class="form-check myform">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label class="form-check-label" for="flexRadioDefault1">
                  Register as a Driver
              </label>
            </div>
          
            <div class="form-check myform">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
              <label class="form-check-label" for="flexRadioDefault2">
                Register as a Customer
              </label>
            </div>
            <br></br>
            <button type="submit" id="submit">Register</button>
          </form>
          </div>
        </div>
      </div>
   
    )
}

export default Signup;