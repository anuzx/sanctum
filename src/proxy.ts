//maximum 2 people can join a room

import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";

export const proxy = async (req: NextRequest) => {
  //overview:check if user is allowed to join a room , if they are let them pass , if not send them back to lobby

  const pathname = req.nextUrl.pathname; //this will extract the room id

  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);

  if (!roomMatch) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const roomId = roomMatch[1];

  //to know who is allowed to conenct to the room and who isn't we need metadata from redis

  const meta = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    `meta:${roomId}`,
  );

  if (!meta) {
    return NextResponse.redirect(new URL("/?error=room-not-found", req.url));
  }
  const existingToken = req.cookies.get("X-auth-token")?.value;
  //user is allwoed to join the room
    if (existingToken && meta.connected.includes(existingToken)) {
      return NextResponse.next()
    }
    
    //user is not allowed to join
    if (meta.connected.length >= 2) {
        return NextResponse.redirect(new URL("/?error=room-full" , req.url))
    }
  const response = NextResponse.next();
  const token = nanoid();
  response.cookies.set("X-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  });
  return response;
};

export const config = {
  matcher: "/room/:path*",
};
