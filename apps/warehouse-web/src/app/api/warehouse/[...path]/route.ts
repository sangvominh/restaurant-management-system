import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = (
  process.env.API_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
const allowedMethods = ["GET", "POST", "PATCH", "DELETE"] as const;
const adminWarehouseRoutes: Record<(typeof allowedMethods)[number], RegExp[]> =
  {
    GET: [
      /^suppliers$/,
      /^suppliers\/[^/]+$/,
      /^categories$/,
      /^materials$/,
      /^materials\/[^/]+$/,
      /^units$/,
      /^receipts$/,
      /^receipts\/[^/]+$/,
      /^material-issues$/,
      /^material-issues\/[^/]+$/,
      /^inventory$/,
      /^inventory\/alerts$/,
      /^inventory\/[^/]+$/,
      /^inventory-movements$/,
    ],
    POST: [
      /^suppliers$/,
      /^categories$/,
      /^materials$/,
      /^receipts$/,
      /^material-issues\/[^/]+\/(approve|reject)$/,
    ],
    PATCH: [/^suppliers\/[^/]+$/, /^categories\/[^/]+$/, /^materials\/[^/]+$/],
    DELETE: [/^suppliers\/[^/]+$/],
  };

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (
    !allowedMethods.includes(request.method as (typeof allowedMethods)[number])
  ) {
    return NextResponse.json(
      { message: "Phương thức không được hỗ trợ" },
      { status: 405 },
    );
  }

  const { path } = await context.params;
  const route = path.join("/");
  const method = request.method as (typeof allowedMethods)[number];
  if (!adminWarehouseRoutes[method].some((pattern) => pattern.test(route))) {
    return NextResponse.json(
      { message: "API nằm ngoài phạm vi Admin Kho" },
      { status: 404 },
    );
  }
  const target = `${API_BASE_URL}/warehouse/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;

  try {
    const response = await fetch(target, {
      method: request.method,
      headers: {
        Accept: "application/json",
        ...(request.headers.get("content-type")
          ? { "Content-Type": request.headers.get("content-type")! }
          : {}),
      },
      ...(request.method === "GET" ? {} : { body: await request.text() }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Không thể kết nối đến máy chủ kho." },
      { status: 502 },
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
