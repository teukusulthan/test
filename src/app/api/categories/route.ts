import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://public.hijrahfood.id";

export async function GET() {
  const res = await fetch(`${BASE_URL}/categories`, {
    headers: { "X-API-Key": process.env.API_KEY ?? "" },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
