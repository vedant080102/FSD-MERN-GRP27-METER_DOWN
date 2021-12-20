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
import BookRide from './Components/Home/BookRide';

import TestMap from './Components/TestMap/TestMap';
import ScrollToTop from './ScrollToTop';
import RegisterDriver from './Components/Driver/RegisterDriver/RegisterDriver';


function App() {
	return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/index.html" element={<Home />} /> */}
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<>
						<Navbar homepage={false}/>
						<Login />
					</>} />
					<Route path="/signup" element={<>
						<Navbar homepage={false}/>
						<Signup/>
					</>} />
					<Route path="/bookings" element={<>
						<Navbar homepage={false}/>
						<Bookings />
						</>}
					/>
					<Route path="/about" element={<>
						<Navbar homepage={false}/>
						<About />
						</>}
					/>
					<Route path="/contact" element={<>
						<Navbar homepage={false}/>
						<Contact />
						</>}
					/>
					<Route path="/login" element={<>
						<Navbar homepage={false}/>
						<Login />
						</>}
					/>
					<Route path="/become-driver" element={<>
						<Navbar homepage={false}/>
						<Driver />
						</>}
					/>
					<Route path="/driverInfo" element={<>
						<Navbar homepage={false}/>
						<RegisterDriver/>
						</>}
					/>
					{/* Test Routes */}
					{/* <Route path="/Map" element={ */}
					<Route path="/book-ride" element={<>
						<Navbar homepage={false}/>
						<BookRide />
						</>}
					/>
				</Routes>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;