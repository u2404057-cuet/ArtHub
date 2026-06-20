import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

// Fetch artworks of the logged-in artist
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

    const artworks = await db.collection("arts")
      .find({ artistEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    await client.close();
    return NextResponse.json({ artworks });
  } catch (err) {
    console.error("Error fetching artist artworks:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch artworks." }, { status: 500 });
  }
}

// Add a new artwork
export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const { title, description, price, category, imageUrl } = await req.json();

    if (!title || !price || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    const newArtwork = {
      title,
      description: description || "",
      price: Number(price),
      category,
      imageUrl,
      artistName: session.user.name,
      artistEmail: session.user.email,
      createdAt: new Date(),
    };

    const result = await db.collection("arts").insertOne(newArtwork);
    await client.close();

    return NextResponse.json({ success: true, artworkId: result.insertedId, message: "Artwork added successfully!" });
  } catch (err) {
    console.error("Error creating artwork:", err);
    return NextResponse.json({ error: err.message || "Failed to create artwork." }, { status: 500 });
  }
}

// Edit/update artwork
export async function PUT(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const { id, title, description, price, category, imageUrl } = await req.json();

    if (!id || !title || !price || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    const updateFields = {
      title,
      description: description || "",
      price: Number(price),
      category,
      imageUrl,
    };

    let artworkObjectId;
    try {
      artworkObjectId = new ObjectId(id);
    } catch (e) {
      artworkObjectId = id;
    }

    const result = await db.collection("arts").updateOne(
      { _id: artworkObjectId, artistEmail: session.user.email },
      { $set: updateFields }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Artwork not found or unauthorized to edit." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Artwork updated successfully!" });
  } catch (err) {
    console.error("Error updating artwork:", err);
    return NextResponse.json({ error: err.message || "Failed to update artwork." }, { status: 500 });
  }
}

// Delete artwork
export async function DELETE(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Artwork ID is required." }, { status: 400 });
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("ArtHub");

    let artworkObjectId;
    try {
      artworkObjectId = new ObjectId(id);
    } catch (e) {
      artworkObjectId = id;
    }

    const result = await db.collection("arts").deleteOne({
      _id: artworkObjectId,
      artistEmail: session.user.email,
    });

    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Artwork not found or unauthorized to delete." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Artwork deleted successfully!" });
  } catch (err) {
    console.error("Error deleting artwork:", err);
    return NextResponse.json({ error: err.message || "Failed to delete artwork." }, { status: 500 });
  }
}
