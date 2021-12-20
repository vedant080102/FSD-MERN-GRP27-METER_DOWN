import React,{ useState } from "react";
import './login.css';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate } from "react-router-dom";
import MyModal from "../base/MyModal";


function Signup() {

    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");
    const [name,setname] = useState("");
    const [phone,setphone] = useState("");
    const [type,settype] = useState("passenger");
    const [statusMsg, setstatusMsg] = useState("");
    const [modalShow, setModalShow] = useState(false);

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
          axiosInstance.post("/api/user/login", data, { withCredentials: true })
          .then((res) => {
            console.log("User Logged in!!", res);
            setstatusMsg(`Account created Successfully!${'\n'}Welcome! 🎉`);
            setModalShow(true);
            setTimeout(() => navigate("/"), 2500);
          })
        }).catch((err)=>{
          console.log(err.response.data);
          setstatusMsg("❗Some error occured");
          setModalShow(true);
        });
    }

    return(
       
        <div>
        <div className="container-fluid bg">
          <div className="container signup">
          <form onSubmit={submitHandler}>
            <h1 id="sign-head">Sign Up</h1>Already have a account? <a className="link" className="mylink" href="/login">Sign In</a>
            <br></br>
            <br></br>
            {/* <label htmlhtmlFor="Name">Name</label><br></br> */}
            <input  type="text" className="myinput" id="Name" placeholder="  Name" value={name} onChange={(e)=>{setname(e.target.value)}}/><br></br>
            <br></br>
            {/* <label htmlhtmlFor="Email">Email</label><br></br> */}
            <input  type="text" className="myinput" id="Email" placeholder="  Email" value={email} onChange={(e)=>{setemail(e.target.value)}} /><br></br>
            <br></br>
            {/* <label htmlhtmlFor="pass">Password</label><br></br> */}
            <input  type="password"  className="myinput" id="pass" placeholder="  Password" value={pass} onChange={(e)=>{setpass(e.target.value)}}/><br></br>
            <br></br>
            {/* <label htmlhtmlFor="contact">Contact No.</label><br></br> */}
            <input  type="tel" className="myinput" id="contact" placeholder="  Contact Number" value={phone} onChange={(e)=>{setphone(e.target.value)}}/><br></br>
            <br></br>
            <div className="form-check myform">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="driver" onChange={(e)=>{settype(e.target.value)}}/>
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Register as a Driver
              </label>
            </div>
          
            <div className="form-check myform">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="passenger" checked onChange={(e)=>{settype(e.target.value)}} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Register as a Passenger
              </label>
            </div>
            <br></br>
            <button type="submit" id="submit">Register</button>
          </form>
          </div>
        </div>
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          msg={statusMsg}
        />
      </div>
   
    )
}

export default Signup;