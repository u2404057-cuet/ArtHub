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
                  <span className="ml-2 text-sm text-[#1E1E1E] font-['DM_Sans']">Art Collector</span>
                </label>
                <label className="flex items-center cursor-pointer select-none">
                  <input
                    type="radio"
                    value="artist"
                    {...register("role")}
                    className="h-4 w-4 text-[#C2693F] border-[#D6CFC4] focus:ring-[#C2693F]"
                  />
                  <span className="ml-2 text-sm text-[#1E1E1E] font-['DM_Sans']">Independent Artist</span>
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
        </div>
      </div>
    </div>
  );
}
