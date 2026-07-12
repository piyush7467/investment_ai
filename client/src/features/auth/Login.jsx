import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { loginUser } from "./auth.api";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { loginSuccess } from "./auth.slice";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      const response = await loginUser(data);

      dispatch(
        loginSuccess({
          user: response.data.user,
          accessToken: response.data.token,
        })
      );

      toast.success(
        `Welcome back, ${response.data.user.name}! 👋`,
        {
          duration: 2500,
        }
      );

      navigate("/dashboard");

    } catch (error) {

      const errorData = error.response?.data;

      if (errorData?.errors?.length) {
        toast.error(errorData.errors[0].message);
      } else {
        toast.error(errorData?.message || "Login failed.");
      }

      console.error(error);

    }
  };
  return (
    <div className="w-full max-w-md bg-[#151A21] border border-white/10 rounded-3xl p-10 shadow-2xl">

      <div className="text-center">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 flex items-center justify-center mx-auto">

          <FaLock className="text-black text-2xl" />

        </div>

        <h1 className="heading text-4xl font-bold mt-6">
          Welcome Back
        </h1>

        <p className="text-slate-400 mt-2">
          Sign in to InvestmentAI
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
      >

        <div>

          <label className="block mb-2 text-sm">
            Email
          </label>

          <input
            type="email"
            placeholder="abc@example.com"
            {...register("email")}
            className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 outline-none focus:border-emerald-400"
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-2">
              {errors.email.message}
            </p>
          )}

        </div>

        <div>

          <label className="block mb-2 text-sm">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 pr-12 outline-none focus:border-emerald-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold hover:scale-[1.02] transition"
        >
          {isSubmitting ? "Signing In..." : "Login"}
        </button>

      </form>

      <p className="text-center mt-8 text-slate-400">

        Don't have an account?

        <Link
          to="/register"
          className="text-emerald-400 ml-2"
        >
          Register
        </Link>

      </p>

    </div>
  );
};

export default Login;