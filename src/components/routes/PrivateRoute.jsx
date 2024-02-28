
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
    const authState = useSelector((state) => state.auth);

    if (!authState.isAuthenticated || !authState.token.AccessToken) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return <Outlet {...rest} />;
};

export default PrivateRoute;
