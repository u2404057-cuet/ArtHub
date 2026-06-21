import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const serverURL = process.env.SERVER_URL || "http://localhost:8000";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("SESSION OBJECT:", JSON.stringify(session, null, 2));

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin role required." }, { status: 401 });
    }

    const token = session.session.token;
    const res = await fetch(`${serverURL}/admin/analytics`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch analytics from backend");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching analytics:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
