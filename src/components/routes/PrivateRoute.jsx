
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
    const authState = useSelector((state) => state.auth);
    if (!authState.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
