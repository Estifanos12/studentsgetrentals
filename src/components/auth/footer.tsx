'use client';

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { toast } from '../ui/use-toast';

type FooterProps = {
  link: string;
  linkLabel: string;
  className: string;
};

const handleLogin = async (provider: string) => {
  try {
    const response = await signIn(provider, {
      callbackUrl: '/',
      redirect: false,
    });

    if (!response?.ok) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Success',
      description: 'Logged in successfully',
    });
  } catch (error) {
    console.log(error);
    toast({
      title: 'Error',
      description: 'Something went wrong',
      variant: 'destructive',
    });
  }
};

export const Footer = ({ link, linkLabel, className }: FooterProps) => {
  return (
    <div className={cn(className)}>
      <div className='my-3'>
        <div className='relative'>
          <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
          >
            <div className='w-full border-t border-gray-200' />
          </div>
          <div className='relative flex justify-center text-sm font-medium leading-6'>
            <span className='bg-white text-black'>Or Continue With</span>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full gap-x-2'>
        <Button
          size='lg'
          className='w-full'
          variant='outline'
          onClick={() => handleLogin('google')}
        >
          <FcGoogle className='h-5 w-5' />
        </Button>
      </div>

      <div className='my-5 text-center w-full'>
        <Link href={link} className='hover:underline'>
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};
