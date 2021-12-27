import React from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";


import Navbar from './Components/base/Navbar';
import Home from './Components/Home/Home';
import Bookings from './Components/Bookings/Bookings';
import Driver from './Components/Driver/Driver';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/loginSignup/Login';
import Signup from './Components/loginSignup/Signup';
import Footer from './Components/base/Footer';
import GetEstimate from './Components/Estimation/GetEstimate';
import ProtectedRoute from './ProtectedRoute'

import ScrollToTop from './ScrollToTop';
import RegisterDriver from './Components/Driver/RegisterDriver/RegisterDriver';
// import Hmap from './Components/Hmap/Hmap';
import RideSum from './Components/RideSummary/RideSum';

import BookRide from './Components/BookRide/BookRide';
import RideChat from './Components/RideChat/RideChat.js';

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
					
					<Route exact path="/bookings" element={<ProtectedRoute usertype='passenger'/>}>
						<Route exact path="/bookings" element={<Bookings />}/>
					</Route>
					<Route path="/ride/get-estimate" element={<GetEstimate/>}/>
					<Route exact path="/ride/book-ride" element={<ProtectedRoute usertype='passenger'/>}>
						<Route path="/ride/book-ride" element={<BookRide/>}/>
					</Route>
					{/* <Route exact path="/ride/ride-chat" element={<ProtectedRoute usertype='passenger'/>}> */}
						<Route path="/ride/ride-chat" element={<RideChat/>}/>
					{/* </Route> */}

					<Route path="/become-driver" element={<Driver/>}/>
					
					{/* <Route path="/driver-details" element={<RegisterDriver/>}/> */}
					{/* Test Routes */}
					{/* <Route path="/Map" element={ */}

					<Route exact path="/driver-details" element={<ProtectedRoute usertype='driver' />}>
						<Route exact path="/driver-details" element={<RegisterDriver/>}/>
					</Route>

					<Route path="*"
						element={
							<main className='flex' style={{ padding: "1rem", height:'60vh', backgroundColor:'var(--yellow)' }}>
								<div style={{color:'var(--purple)'}}>
									<h1 className='fw-bold'>404</h1>
									<h2 className='fw-bold'>PAGE NOT FOUND</h2>
									<p>There's nothing here!</p>
								</div>
							</main>
						}
					/>

					<Route path="/ride-summary" element={<>
						{/* <Navbar homepage={false}/> */}
						<RideSum/>
						</>}
					/>
				</Routes>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;