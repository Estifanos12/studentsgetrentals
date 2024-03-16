'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';

import { newPasswordSchema } from '@/schema';
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
import { useToast } from '../ui/use-toast';
import { apiRequest } from '@/services/api/apiRequest';
import useLocalStorage from '@/hooks/useLocalstorage';

export const NewPasswordForm = () => {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [email] = useLocalStorage('email');
  const [loading, setLoading] = useState(false);
  const form = useForm<{ password: string; confirm_password: string }>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (!email) {
      router.push('/signup');
    }
  }, []);

  const { toast } = useToast();

  const onSubmit = async (data: {
    password: string;
    confirm_password: string;
  }) => {
    const formdata = new FormData();
    formdata.append('token', decodeURIComponent(params?.token as string));
    formdata.append('new_password', data.password);
    formdata.append('confirm_password', data.confirm_password);

    try {
      setLoading(true);
      const response = await apiRequest({
        method: 'POST',
        endpoint: 'api/reset-password',
        data: formdata,
      });

      if (response.status !== 200) {
        toast({
          title: response.data.error,
          description: 'Cannot change your password',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Password Successfully Changed',
      });
      router.push('/login');
    } catch (error) {
      console.log(error);
      toast({
        title: (error?.response?.data?.message as string) || 'Error',
        description: 'Cannot change your password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 gap-10'>
      <div className='max-w-xl px-5 text-center flex flex-col gap-2 items-center justify-center'>
        <h2 className='mb-2 text-xl font-bold'>Change your password</h2>
        <p className='mb-2 text-md '>
          Enter your new password and confirm it to change your password
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full mt-3'
            noValidate
          >
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-2'>
                  <FormLabel>
                    Password <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='********' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirm_password'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-2'>
                  <FormLabel>
                    Confirm password <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='********' type='password' {...field} />
                  </FormControl>
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
                ' Change Password'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
