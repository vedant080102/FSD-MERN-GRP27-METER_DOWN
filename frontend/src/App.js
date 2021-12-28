import React,{useEffect,useState} from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";


import Navbar from './Components/Base/Navbar';
import ScrollToTop from './ScrollToTop';
import Footer from './Components/Base/Footer';

import Home from './Components/Home/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/loginSignup/Login';
import Signup from './Components/loginSignup/Signup';
import GetEstimate from './Components/Estimation/GetEstimate';

import AdminModule from './Components/Admin/Admin';

import Bookings from './Components/RideModule/Bookings/Bookings';
import RideModule from './Components/RideModule/RideModule';
// import BookRide from './Components/RideModule/BookRide/BookRide';
import RideChat from './Components/RideChat/RideChat';
// import RideSum from './Components/RideModule/RideSummary/RideSum';

import Driver from './Components/Driver/Driver';
import RegisterDriver from './Components/Driver/RegisterDriver/RegisterDriver';
import DriverBooking from './Components/DriverBooking/DriverBooking'

import ProtectedRoute from './ProtectedRoute'


import socket from './socket';
import { useSelector } from 'react-redux';
import MyModal from './Components/Base/MyModal';
import Review from './Components/Review/Review';

function App() {
	
	const [acceptmsg,setAccept]= useState("");
	const user = useSelector((state) => state.user.user);
	const chatID = useSelector((state) => state.rideChat.rideChat);
	const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);

	// useEffect(()=>{

	// 	socket.on("ride",(data)=>{
    //         console.log("ride")
    //         console.log(data)
    //         setAccept(data)
    //     })


	useEffect(()=>{

		socket.on("ride",(data)=>{
            console.log("ride")
            console.log(data)
            setAccept(data)
			setstatusMsg("hi")
        })

		// socket.on("allottedPassenger",(data)=>{
		// console.log("allotted")
		// console.log(data)
		// return(
		// 	<Navigate to='/ride/summary'/>
		// )
		// // setRide(data.fareid)  
		// });

		// socket.on("allottedDriver",(data)=>{
		// 	console.log("allotted")
		// 	console.log(data)
		// 	// setRide(data.fareid)
		// })

		// socket.io.on('reconnect', () => {
		// 	socket.emit('join',{"user":user._id})
		// 	chatID && socket.emit('rejoinchat', {"room":chatID, 'sender':user._id});
		// })
	})

	

	return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<Navbar homepage={false}/>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/index.html" element={<Home />} /> */}
					<Route path="/home" element={<Home />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="/signup" element={<Signup/>}/>
					<Route path="/about" element={<About />}/>
					<Route path="/contact" element={<Contact />}/>
					<Route path="/login" element={<Login />}/>
					
					<Route path="/ride/get-estimate" element={<GetEstimate/>}/>

					<Route path="/bookings" element={<ProtectedRoute usertype='passenger' />}>
						<Route path="/bookings" element={<Bookings />}/>
					</Route>

					{/* <Route path="ride/*" element={<ProtectedRoute usertype='passenger' />}> */}
						<Route path="ride/*" element={<RideModule/>}/>
					{/* </Route> */}

					{/* <Route exact path="/ride/book-ride" element={<ProtectedRoute usertype='passenger'/>}>
						<Route path="/ride/book-ride" element={<BookRide/>}/>
					</Route>
					<Route exact path="/ride/summary" element={<ProtectedRoute usertype='passenger'/>}>
					<Route path="/ride/summary" element={<RideSum/>}/>
				</Route> */}
					{/* <Route exact path="/ride/ride-chat" element={<ProtectedRoute usertype={null}/>}> */}

					{user && <Route path="/ride-chat" element={<RideChat/>}/>}
					
					{/* </Route> */}

					<Route path="/become-driver" element={<Driver/>}/>

					<Route path="/driver/fill-details" element={<ProtectedRoute usertype='driver' />}>
						<Route path="/driver/fill-details" element={<RegisterDriver/>}/>
					</Route>

					<Route path="/driver/booking" element={<ProtectedRoute usertype='driver' />}>
						<Route path="/driver/booking" element={<DriverBooking/>}/>
					</Route>

					<Route path="/admin/*" element={<AdminModule/>}/>

					<Route path="*" element={
						<main className='flex' style={{ padding: "1rem", height:'60vh', backgroundColor:'var(--yellow)' }}>
							<div style={{color:'var(--purple)'}}>
								<h1 className='fw-bold'>404</h1>
								<h2 className='fw-bold'>PAGE NOT FOUND</h2>
								<p>There's nothing here!</p>
							</div>
						</main>
					}/>
					<Route path="/review/*" element={<Review/>} />
				</Routes>
				<Footer/>

				<MyModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					msg={statusMsg}
				/>
			</Router>
		</div>
	);
}

export default App;