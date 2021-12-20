import React, { useState } from "react";
import './login.css';
import { axiosInstance } from "../../AxiosSetUp";
import { useNavigate } from "react-router-dom";
import MyModal from "../base/MyModal";

function Login() {

	const [phone, setphone] = useState("");
	const [pass, setpass] = useState("");
	const [statusMsg, setstatusMsg] = useState("");
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			phone: phone,
			password: pass
		}
		axiosInstance.post("/api/user/login", data, { withCredentials: true })
		.then((res) => {
			console.log("User Logged in!!");
			setstatusMsg("Logged In Successfully! 🎉");
			setModalShow(true);
			setTimeout(() => {
				navigate("/");
			}, 2500);
		}).catch((err) => {
			console.log(err.response.data);
			setstatusMsg("❗Some error occured");
			setModalShow(true);
		})
	}

	return (
		<>
			<div className="container-fluid bg">
				<div className="container login">
					<form onSubmit={submitHandler}>
						<h1 id="sign-head">Sign in</h1>New user? <a className="link mylink" href="/signup">Create an account</a>
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