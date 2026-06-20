import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    // Update user details in the user collection
    await db.collection("user").updateOne(
      { email: session.user.email },
      { $set: { name, image: image || "" } }
    );

    await client.close();

    return NextResponse.json({ success: true, message: "Profile updated successfully!" });
  } catch (err) {
    console.error("Error updating profile in DB:", err);
    return NextResponse.json({ error: err.message || "Failed to update profile details" }, { status: 500 });
  }
}
