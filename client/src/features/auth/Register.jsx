import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { registerUser } from "./auth.api";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await registerUser(payload);

      toast.success(
        response.message || "Account created successfully!"
      );

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData?.errors?.length) {
        toast.error(errorData.errors[0].message);
      } else {
        toast.error(
          errorData?.message || "Registration failed."
        );
      }

      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#151A21] border border-white/10 rounded-3xl p-10 shadow-2xl">

      {/* Header */}

      <div className="text-center">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 flex items-center justify-center mx-auto">

          <FaUserPlus className="text-black text-2xl" />

        </div>

        <h1 className="heading text-4xl font-bold mt-6">
          Create Account
        </h1>

        <p className="text-slate-400 mt-2">
          Start your AI investment journey
        </p>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10"
      >

        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}

          <div>

            <label className="block mb-2 text-sm">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 outline-none focus:border-emerald-400"
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-2">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 outline-none focus:border-emerald-400"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 text-sm">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 pr-12 outline-none focus:border-emerald-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block mb-2 text-sm">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className="w-full rounded-2xl bg-[#0D1117] border border-white/10 px-5 py-4 pr-12 outline-none focus:border-emerald-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <p className="text-center mt-8 text-slate-400">

        Already have an account?

        <Link
          to="/login"
          className="text-emerald-400 ml-2 hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
};

export default Register;