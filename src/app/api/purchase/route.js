import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const { artworkId } = await req.json();
    if (!artworkId) {
      return NextResponse.json({ error: "Artwork ID is required." }, { status: 400 });
    }

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    // Fetch user from db to get latest details
    const dbUser = await db.collection("user").findOne({ email: session.user.email });
    if (!dbUser) {
      await client.close();
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Normalize plan and compute limit
    const currentPlan = (dbUser.plan || "free").toLowerCase();
    let purchaseLimit = 3; // default for free
    if (currentPlan.includes("pro")) {
      purchaseLimit = 9;
    } else if (currentPlan.includes("premium") || currentPlan.includes("unlimited")) {
      purchaseLimit = Infinity;
    }

    const purchasedArts = dbUser.purchased_arts || [];
    // Filter out invalid/empty IDs
    const activePurchased = purchasedArts.filter((id) => id && id.trim() !== "");

    // Check if limit is reached
    if (activePurchased.length >= purchaseLimit) {
      await client.close();
      return NextResponse.json({
        error: `You have reached the maximum purchase limit of ${purchaseLimit} paintings allowed on the ${currentPlan} tier. Please upgrade your subscription to buy more.`,
        limitReached: true,
        limit: purchaseLimit,
      }, { status: 403 });
    }

    // If artwork is already purchased, don't duplicate
    if (activePurchased.includes(artworkId)) {
      await client.close();
      return NextResponse.json({ message: "You have already purchased this artwork." }, { status: 200 });
    }

    // Save artworkId to user's purchased_arts
    await db.collection("user").updateOne(
      { _id: dbUser._id },
      { $addToSet: { purchased_arts: artworkId } }
    );

    await client.close();
    return NextResponse.json({ success: true, message: "Artwork purchased successfully!" });
  } catch (err) {
    console.error("Error in purchase API:", err);
    return NextResponse.json({ error: err.message || "Failed to complete purchase." }, { status: 500 });
  }
}
