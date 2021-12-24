import { Navigate, Route , Outlet} from "react-router-dom"
import { useSelector } from 'react-redux'


export default function ProtectedRoute(props) {
    const { path, usertype: userType } = props;
    const user = useSelector((state) => state.user.user);

    if (user) {
        if ((!userType) || (userType === user.type)) {
            return <Outlet />
        }
        else return <Navigate to='/' />
    }
    else return <Navigate to='/login' />
}