'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { CustomInputOTP } from './input_otp';
import { apiRequest } from '@/services/api/apiRequest';
import useLocalStorage from '@/hooks/useLocalstorage';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { resendOtp } from '@/lib/resendOtp';

export const EmailVerification = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email] = useLocalStorage('email');

  useEffect(() => {
    if (!email) {
      router.push('/signup');
    }
  }, []);

  const checkOTP = async () => {
    const formdata = new FormData();
    formdata.append('email', email as string);
    formdata.append('otp', value);

    try {
      setLoading(true);
      const response = await apiRequest({
        method: 'POST',
        endpoint: 'api/verify-otp',
        data: formdata,
      });

      if (response.status !== 200) {
        toast({
          title: response.data.error,
          description: 'Something went wrong when registering',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Email Verified Successfully',
        description:
          "Your email has been verified successfully. You're now logged in",
      });
      router.push('/login');
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

  useEffect(() => {
    if (value.length === 6) {
      checkOTP();
      setValue('');
    }
  }, [value]);

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 gap-10'>
      <div className='max-w-xl px-5 text-center flex flex-col gap-2 items-center justify-center'>
        <h2 className='mb-2 text-xl font-bold'>Check your inbox</h2>
        <p className='mb-2 text-md '>
          We are glad, that you’re with us ? Enter the verification code that we
          have send to your email address{' '}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <CustomInputOTP value={value} setValue={setValue} />
        {loading && (
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='animate-spin bg-primary'
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
        )}
      </div>

      <div>
        <Button onClick={() => resendOtp(email as string)}>Resend OTP</Button>
      </div>
    </div>
  );
};
