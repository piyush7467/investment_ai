import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="relative flex items-center justify-center min-h-screen px-6">

                <Outlet />

            </div>

        </div>
    );
};

export default AuthLayout;