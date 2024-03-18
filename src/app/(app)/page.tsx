import Hero from '@/components/common/hero';
import Requirments from '@/components/common/requirement-card';
import Services from '@/components/common/services';
import Contact from '@/components/common/contact';

export default async function Home() {
  return (
    <>
      <Hero />
      <Requirments />
      <Services />
      <Contact />
    </>
  );
}
