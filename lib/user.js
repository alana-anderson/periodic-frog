'use client'

import { useSession } from 'next-auth/react';

// User Session called on the client
export const User = () => {
  const { data: session } = useSession()
  console.log('Client Session', session)
  return session;
}