'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginSchema } from '../../schema';
import { TLogin } from '@/types';
import { CardWrapper } from '../common/card_wrapper';
import { Header } from './header';
import { Footer } from './footer';
import placeholderImage from '../../../public/placeholder.webp';

import { toast } from '../ui/use-toast';

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TLogin) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    try {
      setLoading(true);
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!response?.ok) {
        console.log(response?.error);
        toast({
          title: 'Login failed',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Login Successfully',
        description: 'You successfull logged in',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-1'>
      <CardWrapper
        header={<Header title='Login' label='Welcome back' />}
        footer={
          <Footer
            link='/signup'
            linkLabel='Don’t have an account? Sign up'
            className='mx-auto w-full max-w-md'
          />
        }
        className='flex flex-1 flex-col justify-start py-12 px-5'
      >
        <div className='mx-auto w-full max-w-md'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 '
              noValidate
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='********'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end'>
                <Link href={'/enter-email'} className='hover:underline text-sm'>
                  <span>Forgot password ?</span>
                </Link>
              </div>

              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? (
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    stroke='#ffffff'
                    className='animate-spin'
                    width={24}
                    height={24}
                  >
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g
                      id='SVGRepo_tracerCarrier'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></g>
                    <g id='SVGRepo_iconCarrier'>
                      {' '}
                      <path
                        d='M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612'
                        stroke='#fffafa'
                        strokeWidth='3.55556'
                        strokeLinecap='round'
                      ></path>{' '}
                    </g>
                  </svg>
                ) : (
                  ' Login'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardWrapper>

      <div className='relative hidden w-0 flex-[1.5] lg:block'>
        <Image
          className='absolute inset-0 w-full h-full object-cover'
          src={placeholderImage}
          alt=''
          objectFit='cover'
        />
      </div>
    </div>
  );
};

export default LoginForm;
