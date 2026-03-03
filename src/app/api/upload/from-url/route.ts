import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    const { url, name } = await request.json();
    if (!url || !name) {
      return NextResponse.json({ error: "URL and name are required" }, { status: 400 });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
    }

    const bytes = await response.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(name) || ".jpg";
    const uniqueName = `${Date.now()}-${path.basename(name, ext)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);
    await fs.writeFile(filePath, buffer);

    const localUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({ url: localUrl, name });
  } catch {
    return NextResponse.json({ error: "Failed to save image from URL" }, { status: 500 });
  }
}
