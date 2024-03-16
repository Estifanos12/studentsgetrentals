'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { enterEmailSchema } from '@/schema';
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

export const EnterEmailForm = () => {
  const form = useForm<{ email: string }>({
    resolver: zodResolver(enterEmailSchema),
    defaultValues: {
      email: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (data: { email: string }) => {
    const formdata = new FormData();
    formdata.append('email', data.email);

    try {
      setLoading(true);
      const response = await apiRequest({
        method: 'POST',
        endpoint: 'api/forgot-password',
        data: formdata,
      });

      if (response.status !== 200) {
        toast({
          title: response.data.error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Email sent successfully',
        description: 'A link has been sent to your email address',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: (error?.response?.data?.message as string) || 'Error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 gap-10'>
      <div className='max-w-xl px-5 text-center flex flex-col gap-2 items-center justify-center'>
        <h2 className='mb-2 text-xl font-bold'>Enter your email</h2>
        <p className='mb-2 text-md '>
          Enter your email that you used to sign up and we will send you a link
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full mt-3'
            noValidate
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-2'>
                  <FormLabel>
                    Email <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      type='email'
                      className='w-full'
                      {...field}
                    />
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
                  <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
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
                ' Send Email'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
