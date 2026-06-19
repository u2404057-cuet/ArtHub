"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "buyer",
    }
  });

  const onSubmit = (data) => {
    console.log("Registration Submit:", data);
    alert(`Account created successfully for ${data.name} as an ${data.role}!`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link 
          href="/" 
          className="font-['Cormorant_Garamond'] text-3xl font-bold tracking-wide text-[#1E1E1E] hover:opacity-90 transition-opacity"
        >
          ArtHub
        </Link>
        <h2 className="mt-6 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-[#6B6560] font-['DM_Sans']">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#C2693F] hover:text-[#A3522E] transition-colors">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#EDE9E1] py-8 px-4 border border-[#D6CFC4] rounded-[8px] shadow-[0_2px_12px_rgba(30,30,30,0.07)] sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-[#1E1E1E] font-['DM_Sans'] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full h-10 px-4 text-sm bg-[#F7F4EF] border border-[#D6CFC4] rounded-[6px] text-[#1E1E1E] placeholder:text-[#6B6560]/70 focus:outline-none focus:border-[#C2693F] transition-colors font-['DM_Sans']"
                placeholder="Evelyn Reed"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-[#B94A3A] font-['DM_Sans']">{errors.name.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-[#1E1E1E] font-['DM_Sans'] mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                  }
                })}
                className="w-full h-10 px-4 text-sm bg-[#F7F4EF] border border-[#D6CFC4] rounded-[6px] text-[#1E1E1E] placeholder:text-[#6B6560]/70 focus:outline-none focus:border-[#C2693F] transition-colors font-['DM_Sans']"
                placeholder="evelyn@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[#B94A3A] font-['DM_Sans']">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-[#1E1E1E] font-['DM_Sans'] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="w-full h-10 px-4 text-sm bg-[#F7F4EF] border border-[#D6CFC4] rounded-[6px] text-[#1E1E1E] placeholder:text-[#6B6560]/70 focus:outline-none focus:border-[#C2693F] transition-colors font-['DM_Sans']"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-[#B94A3A] font-['DM_Sans']">{errors.password.message}</p>
              )}
            </div>

            {/* Account Role (Radio Buttons) */}
            <div>
              <span className="block text-sm font-medium text-[#1E1E1E] font-['DM_Sans'] mb-2.5">
                Join as
              </span>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="radio"
                    value="buyer"
                    {...register("role")}
                    className="h-4 w-4 text-[#C2693F] border-[#D6CFC4] focus:ring-[#C2693F]"
                  />
                  <span className="ml-2 text-sm text-[#1E1E1E] font-['DM_Sans']">Buyer</span>
                </label>
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="radio"
                    value="artist"
                    {...register("role")}
                    className="h-4 w-4 text-[#C2693F] border-[#D6CFC4] focus:ring-[#C2693F]"
                  />
                  <span className="ml-2 text-sm text-[#1E1E1E] font-['DM_Sans']">Artist</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-10 px-5 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200 cursor-pointer shadow-sm"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D6CFC4]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#EDE9E1] px-2 text-[#6B6560] font-['DM_Sans'] select-none">Or</span>
            </div>
          </div>

          {/* Google Sign-up Button */}
          <button
            type="button"
            onClick={() => alert("Google sign-up clicked")}
            className="w-full h-10 px-5 inline-flex items-center justify-center gap-2.5 border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-sm font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#F7F4EF] transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
