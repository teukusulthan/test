import { NextRequest, NextResponse } from "next/server";

const BASE = "https://public.hijrahfood.id";
const KEY = process.env.API_KEY ?? "";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") ?? "/sales";
  const target = new URL(path, BASE);

  req.nextUrl.searchParams.forEach((v, k) => {
    if (k !== "path") target.searchParams.set(k, v);
  });

  const res = await fetch(target.toString(), {
    headers: { "X-API-Key": KEY },
    cache: "no-store",
  });

  return NextResponse.json(await res.json());
}
