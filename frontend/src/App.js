import React from 'react';
import './App.css';
import Navbar from './base/Base';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Home/Home';
import Bookings from './Bookings/Bookings';
import Feedback from './Feedback/Feedback';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './loginSignup/Login';
import Signup from './loginSignup/Signup';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/index.html" element={<Home />} />
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
				</Routes>
			{/* <Home/> */}
			</Router>
		</div>
	);
}

export default App;
