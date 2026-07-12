import Navbar from "../../components/common/Navbar";
import Stats from "../../components/common/Stats";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";
import Footer from "../../components/common/Footer";
import DashboardPreview from "../../components/common/DashboardPreview";
import LiveAnalysis from "../../components/common/LiveAnalysis";

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-400 selection:text-black">
            <Navbar />
            <LiveAnalysis />
            <Stats />
            <Features />
            <HowItWorks />
            <DashboardPreview />
            <Footer />
        </div>
    );
};

export default Home;