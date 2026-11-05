import { NextRequest, NextResponse } from "next/server";

const base = (process.env.API_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const target = `${base}/warehouse/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  try {
    const response = await fetch(target, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    });
    return new NextResponse(response.body, { status: response.status, headers: { "content-type": response.headers.get("content-type") ?? "application/json" } });
  } catch {
    return NextResponse.json({ message: "Không thể kết nối Backend. Hãy kiểm tra API_BASE_URL và trạng thái máy chủ." }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
