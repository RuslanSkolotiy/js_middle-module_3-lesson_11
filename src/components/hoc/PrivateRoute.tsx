import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
type PrivateRouteProps = {
    children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuth } = useAuth();
    const location = useLocation();
    const from = location.pathname;
    if (!isAuth) return <Navigate to="/" replace state={{ from }} />;
    return <>{children}</>;
}

export default PrivateRoute;