import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const POST = async function(req) {
  const data = await req.json();
  console.log('Received request', data);  // Log here
  const session = await getServerSession(authOptions);
  console.log('Session', session);  // Log here
  

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401
    })
  }

  const { id, name, email, username } = data;
  console.log('Received body', data);  // Log here

  console.log('SESSION IDS: ' + id + ' ' + session.user.id);  // Log here
  if (id != session.user.id) {
    return new NextResponse(JSON.stringify({ error: 'Forbidden. You are not authorized to perform this operation.' }), {
      status: 403
    })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email, username },
    });
    
    console.log('User updated', updatedUser);  // Log here

    if (updatedUser) {
      return new NextResponse(JSON.stringify({
        user: {
          id: updatedUser.id + '',
          email: updatedUser.email,
          username: updatedUser.username,
          name: updatedUser.name,
          image: updatedUser.image,
        }
      }), {
        status: 200
      });
      
      // return new NextResponse(JSON.stringify({ message: 'User updated successfully' }), {
      //   status: 200
      // })
      
    } else {
      return new NextResponse(JSON.stringify({ message: 'User update failed' }), {
        status: 500
      })
    }
  } catch (error) {
    console.error('Error updating user', error);  // Log here
    return new NextResponse.json({ message: `Update failed: ${error.message}` })
  }
}
