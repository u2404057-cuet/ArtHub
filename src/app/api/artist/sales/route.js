import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    // Get all of this artist's artworks
    const artistArts = await db.collection("arts")
      .find({ artistEmail: session.user.email })
      .toArray();

    // Create a map of artist artwork IDs to artwork details for easy lookup
    const artistArtsMap = {};
    artistArts.forEach(art => {
      const idStr = art._id.toString();
      artistArtsMap[idStr] = art;
    });

    // Get all users who have purchased_arts array
    const users = await db.collection("user")
      .find({ purchased_arts: { $exists: true, $not: { $size: 0 } } })
      .toArray();

    const salesHistory = [];

    users.forEach(user => {
      const purchasedArts = user.purchased_arts || [];
      purchasedArts.forEach(artId => {
        if (artId && artistArtsMap[artId]) {
          const artwork = artistArtsMap[artId];
          salesHistory.push({
            id: `${user._id}_${artId}`,
            title: artwork.title,
            buyerName: user.name || "Anonymous Buyer",
            buyerEmail: user.email,
            purchaseDate: user.updatedAt ? new Date(user.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            amount: artwork.price,
          });
        }
      });
    });

    await client.close();

    // Sort sales history by date descending
    salesHistory.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

    return NextResponse.json({ salesHistory });
  } catch (err) {
    console.error("Error computing sales history:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch sales history." }, { status: 500 });
  }
}
