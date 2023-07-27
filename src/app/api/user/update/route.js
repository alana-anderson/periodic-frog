import { getSession } from 'next-auth/react';
import { prisma } from "@/lib/prisma";

export const POST = async function(req, res) {
  console.log('Received request');  // Log here
  const session = await getSession({ req });
  console.log('Session', session);  // Log here

  if (!session) {
    res.status(401).json({ message: 'No session found' });
    return;
  }

  const { id, name, email, username } = req.body;
  console.log('Received body', req.body);  // Log here

  if (id !== session.user.id) {
    res.status(403).json({ message: 'Forbidden. You are not authorized to perform this operation.' });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email, username },
    });
    console.log('User updated', updatedUser);  // Log here

    if (updatedUser) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(500).json({ message: 'User update failed' });
    }
  } catch (error) {
    console.error('Error updating user', error);  // Log here
    res.status(500).json({ message: `Update failed: ${error.message}` });
  }
}
