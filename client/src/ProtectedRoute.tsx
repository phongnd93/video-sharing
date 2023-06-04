import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: any) =>
{
    const user = localStorage.getItem('currentUser');

    if (!user?.length)
    {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};