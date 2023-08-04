import { getServerSession } from 'next-auth/next'
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
    const session = await getServerSession(authOptions)
    const body = await req.json();

  if (!session) {
    return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
      );
  }

  // Update the session with the new user data received from the client
  const updatedUser = body;
  session.user = {
    ...session.user,
    ...updatedUser,
  };

  // Return the updated session
  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
