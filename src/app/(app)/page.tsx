import Hero from '@/components/common/hero';
import Requirments from '@/components/common/requirement-card';
import Features from '@/components/common/requirement';

export default async function Home() {
  return (
    <>
      <Hero />
      <Requirments />
      <Features />
    </>
  );
}
