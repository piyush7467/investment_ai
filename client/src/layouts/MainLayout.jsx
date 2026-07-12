import { Outlet } from "react-router-dom";
import Chatbot from "../features/chatbot/Chatbot";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">

            <main className="flex-1 overflow-y-auto h-screen">
                <Outlet />
            </main>
            <Chatbot />

        </div>
    );
};

export default MainLayout;