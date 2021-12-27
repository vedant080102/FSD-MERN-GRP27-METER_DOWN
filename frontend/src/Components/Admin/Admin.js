import { Route, Routes } from "react-router-dom";
import AdminLogin from './AdminLogin.js'

export default function AdminModule () {
    return (
        <>
            <Routes>
                <Route path='login' element={<AdminLogin/>}></Route>
            </Routes>
        </>
    )
}