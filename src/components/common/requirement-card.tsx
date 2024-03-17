import HeadingText from '@/components/common/heading-text';
import { requirements } from '@/config/contents';
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Requirements() {
  return (
    <section>
      <div className='container px-3 lg:max-w-7xl space-y-8 py-12 text-center lg:py-20'>
        {requirements.header || requirements.subheader ? (
          <HeadingText subtext={requirements.subheader}>
            {requirements.header}
          </HeadingText>
        ) : null}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {requirements.content.map((cards) => {
            return (
              <Card
                key={cards.text}
                className='flex cursor-pointer flex-grow flex-col items-center justify-between gap-4 pb-3 bg-background shadow-lg dark:shadow-none dark:hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#20b256,0_0_10px_#20b256,0_0_20px_#20b256] transition-shadow duration-300  border-transparent'
              >
                <div className='flex relative w-full h-[15rem]'>
                  <Image
                    src={cards?.image}
                    alt={cards.text}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-lg'
                  />
                </div>
                <div className='space-y-2 px-5 mt-3'>
                  <CardTitle>{cards.text}</CardTitle>
                  <CardDescription>{cards.subtext}</CardDescription>
                  <CardDescription className='py-3 text-start'>
                    {cards.description}
                  </CardDescription>
                  <CardFooter className='flex justify-end pt-3'>
                    <Link href={cards.link || '/'} target='_blank'>
                      <Button className='text-white'>More details</Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
