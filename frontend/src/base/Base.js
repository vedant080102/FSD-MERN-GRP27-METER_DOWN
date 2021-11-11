import { useEffect, useState } from 'react';
import logo from '../Media/logo.png';


function Navbar(props) {
    
    const [hamActive, setHamActive] = useState(false);
    const [isHome, setIsHome] = useState(props.homepage);

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
            const navbar = document.querySelector(".navbar").classList.add('fixed-top');
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'none';
        }
        // else if (props.component === 'home') {
            // document.querySelector('.header-content').querySelector('.brand').style.display = 'flex';
        // }
    })

    useEffect(() => console.log("home", isHome))

    const Nav = () => <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className='w-100 flex'>
                <a className="navbar-brand m-0" href="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
            </div>
            <div id='hamburg'>
                <svg className={hamActive ? 'active' : ''} width="50" height="50" viewBox="0 0 36 22" 
                    xmlns="http://www.w3.org/2000/svg" onClick={() => hamActive ? setHamActive(false) : setHamActive(true)}>
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

    const SideBar = () => <div class="d-flex flex-column flex-shrink-0 p-3" style={{width: '280px'}}>
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">Sidebar</span>
        </a>
        <hr/>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#" class="nav-link active" aria-current="page">Home</a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">Dashboard</a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">Orders</a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">Products</a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">Customers</a>
            </li>
        </ul>
        <hr />
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                <strong>mdo</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    </div>

    return(
        <>
        {isHome ? 
            Nav() :
            <header className="App-header">
                {Nav()}
            </header>
        }
        {SideBar()}
        </>
    )
}

export default Navbar