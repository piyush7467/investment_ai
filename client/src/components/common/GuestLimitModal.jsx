import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const GuestLimitModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">

      <div className="w-full max-w-lg bg-[#151A21] rounded-3xl border border-white/10 p-8">

        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">

          <FaLock className="text-red-400 text-3xl" />

        </div>

        <h2 className="heading text-3xl text-center mt-6">
          Free Limit Reached
        </h2>

        <p className="text-slate-400 text-center mt-4 leading-7">
          You've used all <strong>5 free AI analyses.</strong>

          <br />

          Create a free account to unlock unlimited
          company analysis and future portfolio features.
        </p>

        <div className="mt-8 space-y-4">

          <Link
            to="/register"
            className="block text-center py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold"
          >
            Create Free Account
          </Link>

          <Link
            to="/login"
            className="block text-center py-4 rounded-2xl border border-white/10 hover:border-emerald-400"
          >
            Login
          </Link>

          <button
            onClick={onClose}
            className="w-full text-slate-400"
          >
            Continue Browsing
          </button>

        </div>

      </div>

    </div>
  );
};

export default GuestLimitModal;