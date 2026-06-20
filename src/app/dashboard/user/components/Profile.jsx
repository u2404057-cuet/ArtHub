"use client";

import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Person, Check } from "@gravity-ui/icons";

export default function Profile() {
  const { data: session, isPending, updateSession } = useSession();
  const user = session?.user;

  const [updateStatus, setUpdateStatus] = useState({ success: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Populate form fields with current user session details
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user, reset]);

  const onUpdateProfile = async (data) => {
    setUpdateStatus({ success: null, message: "" });
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          image: data.image,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update profile details.");
      }

      setUpdateStatus({
        success: true,
        message: "Profile updated successfully! Refresh the page to see changes in the header.",
      });
      if (updateSession) {
        await updateSession();
      }
    } catch (err) {
      setUpdateStatus({
        success: false,
        message: err.message || "Failed to update profile. Please try again.",
      });
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto py-4">
      {/* Page Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Profile Management</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1.5">Update your personal collector information below.</p>
      </div>

      {/* Edit Profile Form Card */}
      <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
        <div className="flex items-center gap-3 border-b border-[#D6CFC4] pb-4 mb-6">
          <Person className="w-5 h-5 text-[#C2693F]" />
          <h3 className="font-['DM_Sans'] font-semibold text-lg text-[#1E1E1E]">Edit Profile Information</h3>
        </div>

        {updateStatus.message && (
          <div className={`p-4 rounded-[6px] mb-6 flex items-start gap-3 font-['DM_Sans'] text-sm ${
            updateStatus.success 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {updateStatus.success ? (
              <Check className="w-5 h-5 mt-0.5" />
            ) : (
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <span>{updateStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-5 font-['DM_Sans']">
          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full h-11 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] text-sm focus:outline-none focus:border-[#C2693F] transition-colors"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-[#B94A3A] mt-1 block">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Avatar URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              className="w-full h-11 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] text-sm focus:outline-none focus:border-[#C2693F] transition-colors"
              {...register("image")}
            />
          </div>

          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving Changes..." : "Save Profile Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
