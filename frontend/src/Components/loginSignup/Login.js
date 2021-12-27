import React, { useState, useEffect } from "react";
import './login.css';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate, Link } from "react-router-dom";
import MyModal from "../Base/MyModal";
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../../Redux/features/userSlice'
import { subscribeUser } from '../../subscription';
import socket from '../../socket';

function Login() {

	const [phone, setphone] = useState("");
	const [pass, setpass] = useState("");
	const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			phone: phone,
			password: pass
		}
		axiosInstance.post("/api/user/login", data, { withCredentials: true })
		.then((res) => {
			// dispatch(login())
			// subscribeUser();
			console.log("User Logged in!!", res.data.user);
			setstatusMsg("Logged In Successfully! 🎉");
			socket.connect()
    		socket.emit("join",{"user":res.data.user._id});
			setModalShow(true);
			setTimeout(() => {
				dispatch(login(res.data.user))
				navigate("/");
			}, 2500);

		}).catch((err) => {
			console.log(err.response.data);
			setstatusMsg(<>
				<h4 className="mb-3 pb-1">❗Some error occured</h4>
				<span className="mt-3">{err.response.data.msg}</span>
			</>);
			setModalShow(true);
		})
	}

	useEffect(()=>{
		(user) ? navigate('/') : console.log("No user")
	},[user])

	return (
		<>
			<div className="container-fluid bg">
				<div className="container login">
					<form onSubmit={submitHandler}>
						<h1 id="sign-head">Sign in</h1>New user? <Link className="text-warning" to="/signup">Create an account</Link>
						{/* <label htmlFor="Email" className="mylabel">Email</label> */}
						<div className="my-5">
							<input className="myinput mb-3" type="tel" id="Phone" placeholder="   Phone Number" value={phone} onChange={(e)=>{setphone(e.target.value)}} required/>
							{/* <label htmlFor="pass" className="mylabel">Password</label> */}
							<input  className="myinput" type="password" id="pass" placeholder="   Password" value={pass} onChange={(e)=>{setpass(e.target.value)}} required/>
						</div>
						
						<button type="submit" id="submit">Login</button>
					</form>
				</div>
			</div>
			<MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				msg={statusMsg}
			/>
		</>
	);

}

export default Login;