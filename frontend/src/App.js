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
import Feedback from './Components/Feedback/Feedback';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Login from './Components/loginSignup/Login';
import Signup from './Components/loginSignup/Signup';
import ServerAutoSuggest from './gogogog'
import Footer from './Components/base/Footer';

import AddressForm from './Components/here-example/AddressForm';
import GetAddress from './Components/Home/geocoding';
import TestMap from './Components/TestMap/TestMap';


function App() {
	return (
		<div className="App">
			<Router>
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
					<Route path="/feedback" element={<>
						<Navbar homepage={false}/>
						<Feedback />
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
					<Route path="/server" element={<>
						{/* <ServerAutoSuggest /> */}
						{/* <AddressForm /> */}
						<GetAddress/>
						</>}
					/>
					{/* Test Routes */}
					<Route path="/Map" element={<>
						<Navbar homepage={false}/>
						<TestMap/>
						</>}
					/>
				</Routes>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;