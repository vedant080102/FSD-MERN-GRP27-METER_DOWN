import React from 'react';
import './App.css';
import Navbar from './base/Base';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './Home/Home';
import Login from './loginSignup/Login';


function App() {
	return (
		<div className="App">
			<Home />
			{/* <Router>
				<nav>
					<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/" exact component={() => <Home />} />
					<Route path="/login" exact component={() => <>
						<Login />
						<Navbar homepage={false}/>
					</>} />
				</Routes>
			</Router> */}
		</div>
	);
}

export default App;
