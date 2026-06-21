import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const serverURL = process.env.SERVER_URL || "http://localhost:8000";
    const artistId = session.user.id || session.user._id || "";
    const email = session.user.email;

    const token = session.session.token;
    const res = await fetch(`${serverURL}/artist-sales?email=${encodeURIComponent(email)}&artistId=${encodeURIComponent(artistId)}`, { 
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch sales history from backend server");
    }
    const data = await res.json();
    return NextResponse.json({ salesHistory: data.salesHistory || [] });
  } catch (err) {
    console.error("Error fetching sales history from backend:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch sales history." }, { status: 500 });
  }
}
