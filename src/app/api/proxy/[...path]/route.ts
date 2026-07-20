import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { headers as nextHeaders } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function proxyRequest(
  req: NextRequest,
  path: string[],
  method: string
): Promise<Response> {
  // ─── Get auth session server-side ────────────────────────────────────────────
  // Next.js API routes run on the server so they CAN read HttpOnly cookies.
  // We get the session token here and forward it to the Express backend.
  const incomingHeaders = await nextHeaders();
  const cookiesHeader = incomingHeaders.get('cookie') || '';
  const authHeader = incomingHeaders.get('authorization') || '';
  
  console.log(`[Proxy Debug] Path: ${path.join('/')}, Method: ${method}`);
  console.log(`[Proxy Debug] Raw cookie header: ${cookiesHeader}`);
  console.log(`[Proxy Debug] Raw authorization header: ${authHeader}`);

  // Directly read HttpOnly session token from the next/headers cookieStore
  let authToken: string | null = null;
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    authToken = cookieStore.get('better-auth.session_token')?.value ?? null;
    console.log('[Proxy Debug] Directly extracted cookie token:', authToken ? 'Token extracted successfully' : 'No token found in cookies');
  } catch (err: any) {
    console.error('[Proxy Error] Failed to read cookies store:', err.message || err);
  }

  // ─── Build target URL ────────────────────────────────────────────────────────
  const pathStr = path.join('/');
  const queryString = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/api/${pathStr}${queryString}`;

  // ─── Forward headers ─────────────────────────────────────────────────────────
  const forwardHeaders: Record<string, string> = {
    'Content-Type': req.headers.get('content-type') || 'application/json',
  };

  if (authToken) {
    forwardHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  // ─── Fetch from Express backend ──────────────────────────────────────────────
  const fetchInit: RequestInit = {
    method,
    headers: forwardHeaders,
  };

  if (method !== 'GET' && method !== 'HEAD') {
    fetchInit.body = await req.text();
  }

  const backendRes = await fetch(targetUrl, fetchInit);

  const contentType = backendRes.headers.get('content-type') ?? '';

  // ─── SSE Streaming (AI chat) ─────────────────────────────────────────────────
  if (contentType.includes('text/event-stream')) {
    return new Response(backendRes.body, {
      status: backendRes.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  }

  // ─── Regular JSON response ───────────────────────────────────────────────────
  const body = await backendRes.text();
  return new Response(body, {
    status: backendRes.status,
    headers: { 'Content-Type': contentType || 'application/json' },
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxyRequest(req, path, 'GET');
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxyRequest(req, path, 'POST');
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxyRequest(req, path, 'PUT');
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxyRequest(req, path, 'DELETE');
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return proxyRequest(req, path, 'PATCH');
}
