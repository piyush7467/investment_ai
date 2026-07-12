import { Outlet } from "react-router-dom";
import Chatbot from "../features/chatbot/Chatbot";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Outlet />
            <Chatbot />

        </div>
    );
};

export default MainLayout;