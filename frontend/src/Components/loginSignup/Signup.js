import React,{ useState } from "react";
import './login.css';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate } from "react-router-dom";
import MyModal from "../Base/MyModal";
import {login} from '../../Redux/features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";


function Signup() {

    const [email,setemail] = useState("");
    const [pass,setpass] = useState("");
    const [name,setname] = useState("");
    const [phone,setphone] = useState("");
    const [type,settype] = useState("passenger");
    const [statusMsg, setstatusMsg] = useState();
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);



    const submitHandler = (e) => {
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
            dispatch(login(res.data.user))
            setstatusMsg(<>
              <h4 className="mb-3 pb-1">Account created Successfully!</h4>
              <span className="mt-3">Welcome to METER DOWN! 🎉</span>
            </>);
            setModalShow(true);
            setTimeout(() => navigate("/"), 2500);
          })
        }).catch((err)=>{
          console.log(err.response.data.msg);
          setstatusMsg(<>
            <h4 className="mb-3 pb-1">❗Some error occured</h4>
            <span className="mt-3">{err.response.data.msg}</span>
          </>);
          setModalShow(true);
        });
    }
    useEffect(()=>{
      (user) ? navigate('/') : console.log("No user")
    },[user])
    return(
       
        <div>
        <div className="container-fluid bg">
          <div className="container signup">
          <form onSubmit={submitHandler}>
            <h1 id="sign-head">Sign Up</h1>Already have a account? <a className="text-warning" href="/login">Sign In</a>
            {/* <label htmlhtmlFor="Name">Name</label> */}
            <input required type="text" className="myinput my-3" id="Name" placeholder="  Name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
            {/* <label htmlhtmlFor="Email">Email</label> */}
            <input required type="text" className="myinput my-3" id="Email" placeholder="  Email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            {/* <label htmlhtmlFor="pass">Password</label> */}
            <input required type="password"  className="myinput my-3" id="pass" placeholder="  Password" value={pass} onChange={(e)=>{setpass(e.target.value)}}/>
            {/* <label htmlhtmlFor="contact">Contact No.</label> */}
            <input required type="tel" className="myinput my-3" id="contact" placeholder="  Contact Number" value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
            
            <div className="form-check myform my-3">
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