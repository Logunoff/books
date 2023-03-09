import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = () => {
    const user = Cookies.get('token');

    if (!user) {
        return <Navigate to='/auth' />;
    }

    return <Outlet />;
};
