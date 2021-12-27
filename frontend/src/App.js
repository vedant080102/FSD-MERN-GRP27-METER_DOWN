import React from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
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
// import RideChat from './Components/RideModule/RideChat/RideChat';
// import RideSum from './Components/RideModule/RideSummary/RideSum';

import Driver from './Components/Driver/Driver';
import RegisterDriver from './Components/Driver/RegisterDriver/RegisterDriver';

import ProtectedRoute from './ProtectedRoute'


function App() {
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
					<Route exact path="/ride/ride-chat" element={<ProtectedRoute usertype='passenger'/>}>
						<Route path="/ride/ride-chat" element={<RideChat/>}/>
					</Route>
					<Route exact path="/ride/summary" element={<ProtectedRoute usertype='passenger'/>}>
						<Route path="/ride/summary" element={<RideSum/>}/>
					</Route> */}

					<Route path="/become-driver" element={<Driver/>}/>

					<Route path="/driver/fill-details" element={<ProtectedRoute usertype='driver' />}>
						<Route path="/driver/fill-details" element={<RegisterDriver/>}/>
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
				</Routes>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;