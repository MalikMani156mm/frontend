import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { isPasswordConfirmed } = useSelector(state => state.auth);

    return isPasswordConfirmed ? children : <Navigate to="/" />;
}

export default PrivateRoute;
