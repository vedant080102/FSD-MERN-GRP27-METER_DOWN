import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Route, Routes } from "react-router-dom";
import AdminLogin from './AdminLogin.js'
import DisplayStats from './DisplayStats.js'
import DisplayUsers from './DisplayUsers.js'
import DisplayRides from './DisplayRides.js'
import './admin.css'


export default function AdminModule () {
    return (
        <div id='admin-main'>
            <Navbar sticky='top' bg='light' className=' mb-4 p-0 px-4 m-0 pt-1 inner-nav' style={{zIndex:'10',top:'76px'}}>
                <Nav className='ml-0 p-0 flex'>
                    <Nav.Item className='mx-2'><Nav.Link as={NavLink} to='users'>View Users</Nav.Link></Nav.Item>
                    <Nav.Item className='mx-2'><Nav.Link as={NavLink} to='view-rides'>View Rides and bookings</Nav.Link></Nav.Item>
                </Nav>
            </Navbar>

            <Routes>
                <Route exact path='/' element={<DisplayStats/>}></Route>
                <Route path='login' element={<AdminLogin/>}></Route>
                <Route path='users' element={<DisplayUsers/>}></Route>
                <Route path='view-rides' element={<DisplayRides/>}></Route>
            </Routes>
        </div>
    )
}