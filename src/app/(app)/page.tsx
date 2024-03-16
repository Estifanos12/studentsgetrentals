'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Loading } from '@/components/common/loading';
import Hero from '@/components/common/hero';
import FeatureCards from '@/components/common/feature-cards';
import Features from '@/components/common/features';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
  }
  return (
    <>
      <Hero />
      <FeatureCards />
      <Features />
    </>
  );
}
