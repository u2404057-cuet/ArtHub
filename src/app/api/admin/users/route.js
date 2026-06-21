import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const serverURL = process.env.SERVER_URL || "http://localhost:8000";

// Helper to check if the session is Admin
async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user || session.user.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET(req) {
  try {
    const session = await checkAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 401 });
    }

    const token = session.session.token;
    const res = await fetch(`${serverURL}/admin/users`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users from backend");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await checkAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 401 });
    }

    const { userId, role } = await req.json();
    if (!userId || !role) {
      return NextResponse.json({ error: "userId and role are required." }, { status: 400 });
    }

    const token = session.session.token;
    const res = await fetch(`${serverURL}/admin/users/${userId}/role`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user role on backend");
    }

    const result = await res.json();
    return NextResponse.json({ success: true, message: "User role updated successfully!", result });
  } catch (err) {
    console.error("Error updating user role:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
