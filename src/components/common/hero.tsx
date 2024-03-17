import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { heroHeader } from '@/config/contents';

export default function HeroHeader() {
  return (
    <section className='lg:max-w-7xl mx-auto flex flex-col md:flex-row-reverse md:justify-end gap-4 pb-12 pt-4 px-2 text-center lg:items-center lg:gap-10 lg:py-20'>
      <div className='flex flex-1 flex-col items-center gap-4 text-center lg:gap-8'>
        <div className='space-y-5'>
          <h1 className='text-3xl font-bold lg:text-5xl'>
            {heroHeader.header}
          </h1>
          <h2 className='text-lg font-light text-foreground lg:text-2xl'>
            {heroHeader.subheader}
          </h2>
          <p className='text-md lg:text-lg font-light text-foreground'>
            {heroHeader.description}
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <Link
            href={'/'}
            className='border border-primary p-2 rounded-md flex items-center gap-2 hover:bg-primary group'
          >
            <span className='text-foreground group-hover:text-white'>
              Review us on{' '}
            </span>
            <Image
              src='/google.svg'
              width={20}
              height={20}
              alt='Google'
              className='inline'
            />
          </Link>
          <Link
            href={'/'}
            className='border border-primary p-2 rounded-md flex items-center gap-2 hover:bg-primary group'
          >
            <span className='text-foreground group-hover:text-white'>
              Review us on
            </span>
            <Image
              src='/facebook.svg'
              width={20}
              height={20}
              alt='Google'
              className='inline'
            />
          </Link>
        </div>
        <Link
          href='/learn'
          target='_blank'
          className={`w-[10rem] text-white ${cn(
            buttonVariants({ size: 'lg' })
          )}`}
        >
          Start learning
        </Link>
      </div>
      {heroHeader.image !== '' ? (
        <div className='flex flex-1 justify-center lg:justify-start '>
          <Image
            src={heroHeader.image}
            width={500}
            height={500}
            alt='Header image'
            className='shadow-2xl border-transparent rounded-xl '
          />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
