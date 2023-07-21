import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/lib/auth";

export async function GET(req, res) {
  const session = await getServerSession(authOptions)

  try {
    const session = await getServerSession(authOptions)
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'You are not logged in.'}), { status: 500 });
  }
}