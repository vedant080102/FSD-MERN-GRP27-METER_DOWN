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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
		
		axiosInstance.post("/api/user/login", {phone: phone, password: password}, { withCredentials: true })
		.then((res) => {
			// dispatch(login())
			console.log("User Logged in!!", res.data.user);
			// setstatusMsg("Logged In Successfully! 🎉");
			// setModalShow(true);
			// setTimeout(() => {
				dispatch(login(res.data.user))
				navigate("/admin");
			// }, 2500);
		}).catch((err) => {
			console.log(err.response.data);
			// setstatusMsg(<>
			// 	<h4 className="mb-3 pb-1">❗Some error occured</h4>
			// 	<span className="mt-3">{err.response.data.msg}</span>
			// </>);
			// setModalShow(true);
		})
    }

    return (
        <div id="admin-login" className='flex p-2'>
            <div className="container flex rounded my-3 m-x1 mx-md-auto p-2 p-md-5 purple-bg">
                <form className="bg-white text-start rounded p-1 p-md-3 w-50">
                    <div className="100 text-center mb-3">
                        <span className=' fs-2' style={{fontFamily:'var(--brandFont)'}}>METER DOWN</span><br/>
                        <span className='fs-4'>Admin Login</span>
                    </div>
                    <div class="mb-3">
                        <label for="InputPhone" class="form-label">Phone Number*</label>
                        <input type="tel" class="form-control" onChange={e => setphone(e.target.value)} id="InputPhone" required />
                    </div>
                    <div class="mb-3">
                        <label for="InputPassword" class="form-label">Password*</label>
                        <input type="password" class="form-control" onChange={e => setpassword(e.target.value)} id="InputPassword" required />
                    </div>
                    <div className="w-100 flex">
                        <button onSubmit={handleSubmit} type="submit" class="btn purple-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}