'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  return <main>Hello</main>;
}
