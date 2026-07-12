import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaUpload, FaCamera, FaArrowLeft, FaSave } from "react-icons/fa";
import { updateProfile } from "./profile.api";
import { loginSuccess } from "../auth/auth.slice";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, accessToken } = useSelector((state) => state.auth);

    const [name, setName] = useState(user?.name || "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
    
    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Trigger local image selection preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                return toast.error("Only image files are allowed.");
            }
            if (file.size > 5 * 1024 * 1024) {
                return toast.error("File size must be less than 5MB.");
            }
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            return toast.error("Name field cannot be empty.");
        }

        // Validate password change inputs if present
        if (newPassword || currentPassword || confirmPassword) {
            if (!currentPassword) {
                return toast.error("Please enter your current password.");
            }
            if (newPassword.length < 8) {
                return toast.error("New password must be at least 8 characters long.");
            }
            // Password regex: at least one letter and one number
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
            if (!passwordRegex.test(newPassword)) {
                return toast.error("New password must contain at least one letter and one number.");
            }
            if (newPassword !== confirmPassword) {
                return toast.error("New passwords do not match.");
            }
        }

        try {
            setLoading(true);
            
            const formData = new FormData();
            formData.append("name", name.trim());
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }
            if (newPassword) {
                formData.append("currentPassword", currentPassword);
                formData.append("newPassword", newPassword);
            }

            const response = await updateProfile(formData);

            if (response.success) {
                // Update local storage and redux state with new user details
                dispatch(
                    loginSuccess({
                        user: response.data,
                        accessToken: accessToken
                    })
                );
                
                toast.success("Profile updated successfully!");
                
                // Clear password fields
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setAvatarFile(null);
            } else {
                throw new Error(response.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            
            {/* Back Button */}
            <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition"
            >
                <FaArrowLeft />
                Back to Dashboard
            </button>

            <h1 className="text-4xl font-bold mt-8">Account Settings</h1>
            <p className="text-slate-400 mt-2">Manage your profile details, avatar, and password.</p>

            <form onSubmit={handleSave} className="mt-8 grid md:grid-cols-3 gap-8">
                
                {/* Left Side: Avatar Panel */}
                <div className="bg-[#151A21] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-4 text-center">Profile Picture</h3>
                    
                    <div className="relative group">
                        <img
                            src={avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150"}
                            alt={user?.name}
                            className="w-32 h-32 rounded-full object-cover border-2 border-emerald-400/50 group-hover:opacity-75 transition"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                            <FaCamera className="text-white text-2xl" />
                        </button>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-6 px-4 py-2 border border-white/10 hover:border-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
                    >
                        <FaUpload className="text-[10px]" />
                        Upload New Photo
                    </button>
                    
                    <p className="text-[10px] text-slate-500 mt-3 text-center">
                        Supports JPG, PNG, GIF. Max 5MB.
                    </p>
                </div>

                {/* Right Side: Inputs Panel */}
                <div className="md:col-span-2 space-y-6">
                    {/* General Settings */}
                    <div className="bg-[#151A21] border border-white/10 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold border-b border-white/5 pb-3">General Information</h3>
                        
                        <div>
                            <label className="block text-slate-400 text-xs font-medium mb-2">Email Address (Read-only)</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/5 text-slate-500 outline-none cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-xs font-medium mb-2">Display Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white outline-none focus:border-emerald-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password Settings */}
                    <div className="bg-[#151A21] border border-white/10 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold border-b border-white/5 pb-3">Update Password</h3>
                        
                        <div>
                            <label className="block text-slate-300 text-xs font-medium mb-2">Current Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white outline-none focus:border-emerald-400"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 text-xs font-medium mb-2">New Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min 8 chars, letter & number"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white outline-none focus:border-emerald-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 text-xs font-medium mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white outline-none focus:border-emerald-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition disabled:opacity-75 disabled:hover:scale-100 cursor-pointer"
                        >
                            <FaSave />
                            {loading ? "Saving Changes..." : "Save Configuration"}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Profile;
