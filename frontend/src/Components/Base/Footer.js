import logo from '../../Media/logo.png';
import {Link} from 'react-router-dom'

function Footer() {

    return <>
        <footer className='pt-3'>
            <div className="container">
                <div className="flex flex-column my-3 py-2">
                    <div className='mb-3'>
                        <img src={logo} alt='Meter-Down' height='50'/>
                    </div>
                    <div>
                        {/* NAV LINKS */}
                        <ul id='bottom-nav-links' className='d-flex -flex-row text-decoration-none ps-0'>
                            <li className='mx-2'><Link to='/'>Book a Ride</Link></li>
                            <li className='mx-2'><Link to='/bookings'>Bookings</Link></li>
                            <li className='mx-2'><Link to="/about">About</Link></li>
                            <li className='mx-2'><Link to="/contact">Contact</Link></li>
                            <li className='mx-2'><Link to="/become-driver">Become a driver</Link></li>
                        </ul>
                    </div>
                    <div className='my-1 py-1'>
                        {/* SOCIAL LINKS */}
                        <ul id='social-links' className='d-flex -flex-row text-decoration-none ps-0'>
                            <li className='mx-2 flex'><a href='#'><i className="fab fa-facebook-f"></i></a></li>
                            <li className='mx-2 flex'><a href='#'><i className="fab fa-instagram"></i></a></li>
                            <li className='mx-2 flex'><a href='#'><i className="fab fa-twitter"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-100 footer-end-part- px-2 py-3" style={{color: 'var(--yellow)'}}>
                <div className='quote mb-2'>Everyone should try a taxi, as it is part of the Mumbai experience.</div>
                <p>Image Credits: <a className='link-warning' target={'_blank'} href='https://markkuphoto.com/personal/mumbai-taxi-company/'>Markkuphoto</a></p>
                {/* <div className="muted">Credits: Lorem, ipsum dolor.</div> */}
            </div>
        </footer>
    </>
}

export default Footer;