import { useEffect, useState } from 'react';
import logo from '../../Media/logo.png';
import Sidebar from "react-sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Navbar(props) {
    
    // const [hamActive, setHamActive] = useState(false);
    const [isHome, setIsHome] = useState(props.homepage);
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState({
        home: false,
        bookings: false,
        feedback: false,
        about: false,
        contact: false
    });

    const history = useNavigate();
    
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
        if (!props.homepage) {
            document.querySelector(".navbar").classList.add('fixed-top');
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'none';
        }
        // else if (props.component === 'home') {
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'flex';
    })

    useEffect(() => {
        let page = window.location.pathname.slice(1);
        page = page.split("/")[0]
        console.log("page:", page)

        setActivePage({
            home: false,
            bookings: false,
            feedback: false,
            about: false,
            contact: false
        })
        if (page === '' || page === 'home') {
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
        else if (page === 'feedback') {
            setActivePage(prevState => ({
                ...prevState,
                feedback: true
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
        // console.log("page:", activePage);
    }, [history])

    const Nav = () => <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className='w-100 flex'>
                    <a className="navbar-brand m-0" href="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </a>
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
        <a href="/" className="d-flex mb-3 mb-md-0 me-md-auto text-decoration-none mx-auto">
            <span className="side-comp fs-4">METER DOWN</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto text-white">
            <li className="nav-item">
                {/* <Link to={{
                    pathname: "/home",
                    hash: "#book-a-ride",
                }} className={"nav-link " + (activePage.home ? "active" : "")}>Book a Ride</Link> */}
                <HashLink to='/home#book-a-ride' className={"nav-link " + (activePage.home ? "active" : "")}>Book a Ride</HashLink>
            </li>
            <li>
                <Link to="/bookings" className={"nav-link " + (activePage.bookings ? "active" : "")}>My Bookings</Link>
            </li>
            <li>
                <Link to="/feedback" className={"nav-link " + (activePage.feedback ? "active" : "")}>Feedback</Link>
            </li>
            <li>
                <Link to="/about" className={"nav-link " + (activePage.about ? "active" : "")}>About</Link>
            </li>
            <li>
                <Link to="/contact" className={"nav-link " + (activePage.contact ? "active" : "")}>Contact</Link>
            </li>
        </ul>
        <hr />
        <div>
            <Link className='text-white text-decoration-none btn border purple-btn' to='/login'>Login / Register</Link>
        </div>
        {/* <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div> */}
    </div>


    return(
        <>
            {isHome ? <>
                {Nav()}
                </> :
                <header className="App-header">
                    {Nav()}
                    {/* <Sidebar
                        sidebar={SideBar()}
                        children={''}
                        open={sidebarOpen}
                        onSetOpen={setsidebarOpen}
                        rootClassName={'sidebar-root'}
                        sidebarClassName={'sidebar-sb'}
                        contentClassName={'content-sb'}
                        overlayClassName={'overlay-sb'}
                    ></Sidebar> */}
                </header>
            }
        </>
    )
}

export default Navbar