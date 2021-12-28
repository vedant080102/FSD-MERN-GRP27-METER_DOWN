import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Route, Routes } from "react-router-dom";
import AdminLogin from './AdminLogin.js'
import DisplayStats from './DisplayStats.js'
import DisplayUsers from './DisplayUsers.js'
import DisplayRides from './DisplayRides.js'
import { useSelector } from "react-redux";
import './admin.css'
import { useEffect } from "react";

export default function AdminModule () {
    
    const user = useSelector((state)=> state.user.user);

    // useEffect()

    return (
        <>
            <Navbar sticky='top' bg='light' className='justify-content-center p-0 px-4 m-0 pt-1' style={{zIndex:'10',top:'76px'}}>
                <Nav className='ml-0 p-0 flex'>
                    <Nav.Item className='mx-2'><Nav.Link as={NavLink} to=''>Statistics</Nav.Link></Nav.Item>
                    <Nav.Item className='mx-2'><Nav.Link as={NavLink} to='users'>Users</Nav.Link></Nav.Item>
                    <Nav.Item className='mx-2'><Nav.Link as={NavLink} to='view-rides'>Rides {'&'} bookings</Nav.Link></Nav.Item>
                </Nav>
            </Navbar>
            <div id='admin-main' className="p-2 flex">
                <Routes>
                    <Route exact path='/' element={<DisplayStats/>}></Route>
                    <Route path='login' element={<AdminLogin/>}></Route>
                    <Route path='users' element={<DisplayUsers/>}></Route>
                    <Route path='view-rides' element={<DisplayRides/>}></Route>
                </Routes>
            </div>
        </>
    )
}