import { useState } from 'react'
import { axiosInstance } from '../../AxiosSetUp';
import { useDispatch } from 'react-redux';
import './admin.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/features/userSlice';

export default function AdminLogin() {

    const dispatch = useDispatch();
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [loginError, setloginError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
		
		axiosInstance.post("/api/user/login", {phone: phone, password: password}, { withCredentials: true })
		.then((res) => {
			console.log("User Logged in!!", res.data.user);
            dispatch(login(res.data.user))
            navigate("/admin");
		}).catch((err) => {
            setloginError(true);
			console.log(err.response.data);
		})
    }

    return (
        <div id="admin-login" className='flex p-2'>
            <div className="container flex rounded my-3 m-x1 mx-md-auto p-2 p-md-5 purple-bg">
                <form className="bg-white text-start rounded p-1 p-md-3 w-50" onSubmit={handleSubmit}>
                    <div className="100 text-center mb-3">
                        <span className=' fs-2' style={{fontFamily:'var(--brandFont)'}}>METER DOWN</span><br/>
                        <span className='fs-4'>Admin Login</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPhone" className="form-label">Phone Number*</label>
                        <input type="tel" className="form-control" onChange={e => setphone(e.target.value)} id="InputPhone" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password*</label>
                        <input type="password" className="form-control" onChange={e => setpassword(e.target.value)} id="InputPassword" required />
                    </div>
                    <div className={"alert alert-danger alert-dismissible fade " + (loginError ? "show" : 'd-none')} role="alert">
                        ❗Invalid Credentials
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div className="w-100 flex">
                        <button onSubmit={handleSubmit} type="submit" className="btn purple-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}