"use client";

import { useEffect, useState } from "react";
import { Check } from "@gravity-ui/icons";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`Successfully changed user role to ${newRole}!`);
        fetchUsers();
      } else {
        setError(data.error || "Failed to update role.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during updating.");
    } finally {
      setUpdatingId(null);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Manage Users</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Review accounts, monitor verification levels, and update global user permissions.</p>
      </div>

      {/* Messages */}
      {message && (
        <div className="p-4 rounded-[6px] bg-green-50 text-green-800 border border-green-200 text-sm font-['DM_Sans'] flex items-center gap-2">
          <Check className="w-5 h-5 text-green-700 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-[6px] bg-red-50 text-red-800 border border-red-200 text-sm font-['DM_Sans']">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-[#EDE9E1] border border-dashed border-[#D6CFC4] rounded-[8px] p-6 font-['DM_Sans']">
          <p className="text-base text-[#1E1E1E] font-medium">No Users Found</p>
        </div>
      ) : (
        <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-['DM_Sans']">
              <thead>
                <tr className="border-b border-[#D6CFC4] bg-[#EDE9E1]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider">Plan Tier</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6B6560] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6CFC4]/55 bg-[#F7F4EF]/40">
                {users.map((u) => {
                  const role = u.role || "buyer";
                  const plan = u.plan || "free";
                  
                  return (
                    <tr key={u._id} className="hover:bg-[#EDE9E1]/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[#1E1E1E]">{u.name || "Anonymous User"}</td>
                      <td className="px-6 py-4 text-sm text-[#6B6560] font-mono">{u.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          role === "admin" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : role === "artist" 
                            ? "bg-[#C2693F]/15 text-[#C2693F]" 
                            : "bg-[#D6CFC4]/40 text-[#6B6560]"
                        }`}>
                          {role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-mono text-xs font-semibold uppercase ${
                          plan === "free" ? "text-zinc-500" : "text-[#4A6B5D]"
                        }`}>
                          {plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {updatingId === u._id ? (
                          <span className="text-xs text-[#6B6560] italic animate-pulse">Updating...</span>
                        ) : (
                          <div className="inline-flex rounded-md shadow-sm">
                            <button
                              onClick={() => handleRoleChange(u._id, "user")}
                              disabled={role === "user"}
                              className={`px-3 py-1 text-xs font-medium border border-[#D6CFC4] rounded-l-[6px] transition-colors cursor-pointer ${
                                role === "user" 
                                  ? "bg-[#D6CFC4]/50 text-[#6B6560] cursor-not-allowed" 
                                  : "bg-[#EDE9E1]/50 text-[#1E1E1E] hover:bg-[#F7F4EF]"
                              }`}
                            >
                              User
                            </button>
                            <button
                              onClick={() => handleRoleChange(u._id, "artist")}
                              disabled={role === "artist"}
                              className={`px-3 py-1 text-xs font-medium border-t border-b border-r border-[#D6CFC4] transition-colors cursor-pointer ${
                                role === "artist" 
                                  ? "bg-[#C2693F]/20 text-[#C2693F] cursor-not-allowed" 
                                  : "bg-[#EDE9E1]/50 text-[#1E1E1E] hover:bg-[#F7F4EF]"
                              }`}
                            >
                              Artist
                            </button>
                            <button
                              onClick={() => handleRoleChange(u._id, "admin")}
                              disabled={role === "admin"}
                              className={`px-3 py-1 text-xs font-medium border-t border-b border-r border-[#D6CFC4] rounded-r-[6px] transition-colors cursor-pointer ${
                                role === "admin" 
                                  ? "bg-emerald-100 text-emerald-800 cursor-not-allowed" 
                                  : "bg-[#EDE9E1]/50 text-[#1E1E1E] hover:bg-[#F7F4EF]"
                              }`}
                            >
                              Admin
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
