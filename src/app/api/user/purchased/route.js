import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    const dbUser = await db.collection("user").findOne({ email: session.user.email });
    await client.close();

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const purchasedIds = dbUser.purchased_arts || [];
    const activePurchasedIds = purchasedIds.filter(id => id && id.trim() !== "");

    // Fetch all artworks from the backend server
    const serverURL = process.env.SERVER_URL || "http://localhost:8000";
    const artsRes = await fetch(`${serverURL}/arts`, { cache: "no-store" });
    const allArts = await artsRes.json();

    // Filter to get only purchased artworks
    const boughtArtworks = allArts.filter(art => 
      activePurchasedIds.includes(art._id) || activePurchasedIds.includes(art.id)
    );

    return NextResponse.json({ boughtArtworks });
  } catch (err) {
    console.error("Error fetching user bought artworks:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch purchased artworks" }, { status: 500 });
  }
}
