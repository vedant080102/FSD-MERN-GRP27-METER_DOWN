import { useEffect, useState } from 'react';
import logo from '../../Media/logo.png';
import userP from '../../Media/user.svg';
import Sidebar from "react-sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { axiosInstance } from '../../AxiosSetUp';
import { useSelector, useDispatch } from 'react-redux'
import {login, logout} from '../../Redux/features/userSlice'
import InstallPWA from './InstallEve';
import {unsubscribeUser} from "../../subscription"

function Navbar(props) {    

    let page = window.location.pathname.slice(1).split("/")[0]
    // const [userInfo,setuserInfo] = useState("");
    const [isHome, setIsHome] = useState(page === '' || page === 'home' ? true : false);
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState({
        home: false,
        bookings: false,
        becomeDriver: false,
        about: false,
        contact: false,
        test:false
    });
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const history = useNavigate();

    const getUser = async() => {
        try {
            const { data } = await axiosInstance.get("/api/user/user",{ withCredentials:true })
            // console.log(data.userData);
            // setuserInfo(data.userData);
            dispatch(login(data.userData));
        } catch (error) {
            // console.log(error);
            console.log("No user is logged in OR there might be some issues");
        }
    }

    useEffect(()=> console.log("hi user:", user), [user]);
    // useEffect(()=> console.log("home status:", isHome), [isHome]);

    const logoutHandler = async(e) =>{
        const { data } = await axiosInstance.get("/api/user/logout",{withCredentials:true});
        // unsubscribeUser()
        console.log(data.userData);
        // setuserInfo(data.userData);
        dispatch(logout());
    }
    
    useEffect(()=> {
        document.addEventListener("scroll", function () {
            if (document.querySelector(".home-header") != null) {
                const navbar = document.querySelector(".home-header").querySelector('.navbar');
                // const headheight = document.getElementsByClassName('App-header').clientHeight;
                const navbarHeight = window.screen.height - 70;
            
                const distanceFromTop = Math.abs(
                    document.body.getBoundingClientRect().top
                );

                (distanceFromTop >= navbarHeight) ? navbar.classList.add("fixed-top") : navbar.classList.remove("fixed-top");
            }
        });
        if (!isHome) {
            document.querySelector(".navbar").classList.add('fixed-top');
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'none';
        }
        // else if (props.component === 'home') {
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'flex';
    },[])

    useEffect(() => {
        page = window.location.pathname.slice(1);
        page = page.split("/")[0]
        // console.log("page:", page)

        setIsHome(false)
        setActivePage({
            home: false,
            bookings: false,
            becomeDriver: false,
            about: false,
            contact: false
        })
        if (page === '' || page === 'home') {
            setIsHome(true)
            setActivePage(prevState => ({
                ...prevState,
                home: true
            }))
        }
        else if (page === 'bookings') {
            setActivePage(prevState => ({
                ...prevState,
                bookings: true
            }))
        }
        else if (page === 'become-driver') {
            setActivePage(prevState => ({
                ...prevState,
                becomeDriver: true
            }))
        }
        else if (page === 'about') {
            setActivePage(prevState => ({
                ...prevState,
                about: true
            }))
        }
        else if (page === 'contact') {
            setActivePage(prevState => ({
                ...prevState,
                contact: true
            }))
        }
        setsidebarOpen(false)
    }, [history])

    useEffect(()=>{
        if (!user) getUser()
    },[1]);

    const Nav = () => <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className='w-100 flex'>
                    <Link className="navbar-brand m-0" to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                </div>
                <div id='hamburg'>
                    <svg className={sidebarOpen ? 'active' : ''} width="50" height="50" viewBox="0 0 36 22" 
                        xmlns="http://www.w3.org/2000/svg" onClick={() => {
                            // hamActive ? setHamActive(false) : setHamActive(true)
                            sidebarOpen ? setsidebarOpen(false) : setsidebarOpen(true)
                    }}>
                        <g transform="matrix(1,0,0,1,-419.5,-274.131)">
                            <g id="arrow_rocket">
                                <path id="top" d="M420,274.631L450,274.631C450,274.631 459.044,284.599 450,284.599C440.956,284.599 420,284.646 420,284.646L430.014,274.631"/>
                                <g transform="matrix(1,-1.22465e-16,-1.22465e-16,-1,0,569.277)">
                                    <path id="bottom" d="M420,274.631L450,274.631C450,274.631 459.044,284.599 450,284.599C440.956,284.599 420,284.646 420,284.646L430.014,274.631"/>
                                </g>
                                <g transform="matrix(1,0,0,1,0,-0.0234189)">
                                    <path id="middle" d="M420,284.646L450,284.646" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </nav>
        <Sidebar
            sidebar={SideBar()}
            children={''}
            open={sidebarOpen}
            onSetOpen={setsidebarOpen}
            rootClassName={'sidebar-root'}
            sidebarClassName={'sidebar-sb'}
            // contentClassName={'content-sb'}
            // overlayClassName={'overlay-sb'}
            styles={{
                root: {
                  position: undefined,
                  zIndex: "20"
                },
                sidebar: {
                  position: "fixed",
                  width: "310px",
                  height: "100vh",
                  top: "0px",
                  zIndex: "20"
                },
                content: {
                  position: undefined,
                  top: undefined,
                  left: undefined,
                  right: undefined,
                  bottom: undefined
                },
                overlay: {
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: "15"
                }
              }}
        ></Sidebar>
    </>

    const SideBar = () => <div className="side-col d-flex flex-column flex-shrink-0 p-3">
        {/* <div>
            <h1 className='text-white'>{userInfo.name}</h1>
        </div> */}
        <a href="/" className="d-flex mb-3 mb-md-0 me-md-auto text-decoration-none mx-auto">
            <span className="side-comp fs-4">METER DOWN</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto text-white">
            <li className="nav-item">
                <HashLink to='/home#book-a-ride' className={"nav-link " + (activePage.home ? "active" : "")}>Book a Ride</HashLink>
            </li>
            <li>
                <Link to="/bookings" className={"nav-link " + (activePage.bookings ? "active" : "")}>My Bookings</Link>
            </li>
            <li>
                <Link to="/become-driver" className={"nav-link " + (activePage.becomeDriver ? "active" : "")}>Become a Driver</Link>
            </li>
            <li>
                <Link to="/about" className={"nav-link " + (activePage.about ? "active" : "")}>About</Link>
            </li>
            <li>
                <Link to="/contact" className={"nav-link " + (activePage.contact ? "active" : "")}>Contact</Link>
            </li>
            <li>
                <Link to="/driverBooking" className={"nav-link " + (activePage.test ? "active" : "")}>Test</Link>
            </li>
        </ul>
        <hr/>
        <div><InstallPWA/></div>
        <hr />
        {user ? <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
                <img src={userP} alt="" width="32" height="32" className="rounded-circle me-2"/>
                Hi<strong className='ms-2'>{user.name}</strong>!
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                {/* <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li> */}
                <li><button className="dropdown-item" onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i> Sign out</button></li>
            </ul>
        </div> : <Link className='text-white text-decoration-none btn border purple-btn' to='/login'>Login / Register</Link>}
    </div>


    return(
        isHome ? (!props.homepage) ? <></>
         : 
        <>{Nav()}</>
         :
        <header className="App-header">{Nav()}</header>
    )
}

export default Navbar