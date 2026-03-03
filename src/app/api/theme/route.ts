import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const THEME_FILE = path.join(DATA_DIR, "theme.json");

export async function GET() {
  try {
    const data = await fs.readFile(THEME_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(THEME_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save theme" }, { status: 500 });
  }
}
