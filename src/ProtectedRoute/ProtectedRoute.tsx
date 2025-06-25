import { Navigate, useLocation } from 'react-router-dom';
import { UseAuth } from '../Context/UseAuth';
import type { ReactNode } from 'react';

type Props = { children: ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = UseAuth();
    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
