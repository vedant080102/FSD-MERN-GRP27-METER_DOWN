import React,{ useState } from "react";
import './login.css';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate } from "react-router-dom";


function Signup() {

    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");
    const [name,setname] = useState("");
    const [phone,setphone] = useState("");
    const [type,settype] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(type);
        const data = {
          name : name,
          password : pass,
          email : email,
          phone : phone,
          type : type
        }
        console.log(data);

        axiosInstance.post("/api/user/register", data ,{ withCredentials:true }).then((response)=>{
          console.log(response);
          axiosInstance.post("/api/user/login", data , {withCredentials:true}).then((res)=>{
            console.log(res);
            navigate("/");
          }).catch((err)=>{
            console.log(err);
          })
        }).catch((err)=>{
          console.log(err);
        });
    }

    return(
       
        <div>
        <div className="container-fluid bg">
          <div className="container signup">
          <form onSubmit={submitHandler}>
            <h1 id="sign-head">Sign Up</h1>Already have a account? <a class="link" className="mylink" href="/login">Sign In</a>
            <br></br>
            <br></br>
            {/* <label htmlFor="Name">Name</label><br></br> */}
            <input type="text" className="myinput" id="Name" placeholder="  Name" value={name} onChange={(e)=>{setname(e.target.value)}}/><br></br>
            <br></br>
            {/* <label htmlFor="Email">Email</label><br></br> */}
            <input type="text" className="myinput" id="Email" placeholder="  Email" value={email} onChange={(e)=>{setemail(e.target.value)}} /><br></br>
            <br></br>
            {/* <label htmlFor="pass">Password</label><br></br> */}
            <input type="password"  className="myinput" id="pass" placeholder="  Password" value={pass} onChange={(e)=>{setpass(e.target.value)}}/><br></br>
            <br></br>
            {/* <label htmlFor="contact">Contact No.</label><br></br> */}
            <input type="tel" className="myinput" id="contact" placeholder="  Contact Number" value={phone} onChange={(e)=>{setphone(e.target.value)}}/><br></br>
            <br></br>
            <div class="form-check myform">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="driver" onChange={(e)=>{settype(e.target.value)}}/>
              <label class="form-check-label" for="flexRadioDefault1">
                  Register as a Driver
              </label>
            </div>
          
            <div class="form-check myform">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="passenger" onChange={(e)=>{settype(e.target.value)}} />
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