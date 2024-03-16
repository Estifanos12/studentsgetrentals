'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

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
import { registerSchema } from '../../schema';
import { TRegister } from '@/types';
import { CardWrapper } from '../common/card_wrapper';
import { Header } from './header';
import { Footer } from './footer';
import placeholderImage from '../../../public/placeholder.webp';
import { Checkbox } from '../ui/checkbox';
import { apiRequest } from '@/services/api/apiRequest';
import { toast } from '../ui/use-toast';
import useLocalStorage from '@/hooks/useLocalstorage';

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [_, setValue] = useLocalStorage('email');
  const form = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      agree_terms: false,
    },
  });
  const onSubmit = async (data: TRegister) => {
    const formdata = new FormData();
    formdata.append('fullname', data?.fullname);
    formdata.append('email', data?.email);
    formdata.append('password', data?.password);

    try {
      setLoading(true);
      const response = await apiRequest({
        method: 'POST',
        data: formdata,
        endpoint: 'api/register',
      });

      if (response.status !== 200) {
        toast({
          title: response.data.error,
          description: 'Something went wrong when registering',
          variant: 'destructive',
        });

        return;
      }
      setValue(data?.email);
      toast({
        title: 'Registered successfully',
        description: "You've been successfully registered",
      });
      router.push('/verify-email');
    } catch (error) {
      console.log(error);
      toast({
        title: (error?.response?.data?.error as string) || 'Error',
        description: 'Something went wrong when registering',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex min-h-screen flex-1'>
      <CardWrapper
        header={<Header title='Register' label='Start your journey with us' />}
        footer={
          <Footer
            link='/login'
            linkLabel='Already have an account? Sign in'
            className='mx-auto w-full max-w-md'
          />
        }
        className='flex flex-1 flex-col justify-start py-12 px-5'
      >
        <div className='mx-auto w-full max-w-md'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 '
              noValidate
              encType='multipart/form-data'
            >
              <FormField
                control={form.control}
                name='fullname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full name <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your fullname'
                        {...field}
                        className=''
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='********'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='agree_terms'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center gap-3 my-3'>
                      <FormControl>
                        <Checkbox onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>
                        I agree to the{' '}
                        <Link href={'/'} className='hover:underline'>
                          {' '}
                          terms and condition
                        </Link>
                        <span className='text-red-500'>*</span>
                      </FormLabel>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  ' Register'
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

export default RegisterForm;
