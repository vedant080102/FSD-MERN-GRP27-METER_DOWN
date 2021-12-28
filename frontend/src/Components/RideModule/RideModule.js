import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import BookRide from './BookRide/BookRide'
// import RideChat from '../RideChat/RideChat'
import RideSum from './RideSummary/RideSum'
import ProtectedRoute from '../../ProtectedRoute'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function RideModule() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    var counter = 0, noUser = false;

    console.log("HOOOPOPOOPOOPPPPPPPPPP")


    useEffect(()=> {
        // if ((counter > 1) || noUser) {
        //     navigate('/');
        // }
        // console.log("user:", user)
        if(user != null) {
            // console.log("user:", user)
            if (user.type != 'passenger') {
                console.log("in correct user!!!!!");                
                counter++;
                navigate('/');
            }
            // else {counter = 0}
        } else {
            noUser = true
            navigate('/');
        }

        console.log("counter", counter)
    })

    return(
        <>
            {/* <Link to={'book-ride'}>book-ride</Link>
            <Link to={'ride-chat'}>ride-chat</Link>
            <Link to={'summary'}>summary</Link> */}

            <Routes>
                <Route exact path='/' render={()=> <Navigate to={'book-ride'}/>}/>

                {/* <Route path="book-ride" element={<ProtectedRoute usertype='passenger'/>}> */}
                    <Route path="book-ride" element={<BookRide/>}/>
                {/* </Route> */}
                {/* <Route path="ride-chat" element={<ProtectedRoute usertype='passenger'/>}> */}
                    {/* <Route path="ride-chat" element={<RideChat/>}/> */}
                {/* </Route> */}
                {/* <Route path="summary" element={<ProtectedRoute usertype='passenger'/>}> */}
                    <Route path="summary" element={<RideSum/>}/>
                {/* </Route> */}
            </Routes>

        </>
    )
}