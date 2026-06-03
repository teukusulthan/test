import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://public.hijrahfood.id";

async function proxy(path: string, req: NextRequest) {
  const url = new URL(`${BASE_URL}${path}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": process.env.API_KEY ?? "" },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  return proxy("/sales", req);
}
