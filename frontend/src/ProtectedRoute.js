import { Navigate, Route , Outlet, useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
// import MyModal from "./Components/base/MyModal";


export default function ProtectedRoute(props) {
    // const [statusMsg, setstatusMsg] = useState();
	// const [modalShow, setModalShow] = useState(false);

	const [userPresent, setuserPresent] = useState(true);

    const { path, usertype: userType } = props;
    var user;
    const navigate = useNavigate();

    // useEffect(()=>console.log("user type:", user.type, userType));

    // const IncorrectUser = () => {
    //     setstatusMsg(`You need to login using a '${userType}' account`);
    //     setModalShow(true);
    //     return setTimeout(() => {
    //         (<Navigate to='/'/>)
    //     }, 2500);
    // }

    // const noUser = () => {
    //     setstatusMsg(`You need to login using a '${userType}' account`);
    //     setModalShow(true);
    //     setTimeout(() => {
    //         navigate("/login");
    //     }, 2500);
    // }

    // const GetUser = () => {
        user = useSelector((state) => state.user.user);
        // setuserPresent(user!=null ? true : false);
        if (user) {
            if (user.type === userType) return <Outlet />
            else return <Navigate to='/'/>
        }
        else return <Navigate to='/login'/>
    // }

    // useEffect(()=> {
    //     GetUser()
    // },[])

    // return (
    //     <>
    //         {user ? ((!userType) || (userType === user.type)) ? <Outlet /> : <Navigate to='/'/> : <Navigate to='/login' />}
    //         {/* <MyModal
    //             show={modalShow}
    //             onHide={() => setModalShow(false)}
    //             msg={statusMsg}
    //         /> */}
    //     </>
    // )
}