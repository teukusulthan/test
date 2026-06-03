import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://public.hijrahfood.id";

export async function GET(req: NextRequest) {
  const url = new URL(`${BASE_URL}/summary`);
  req.nextUrl.searchParams.forEach((value, key) => {
    if (value) url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": process.env.API_KEY ?? "" },
  });

  return NextResponse.json(await res.json());
}
