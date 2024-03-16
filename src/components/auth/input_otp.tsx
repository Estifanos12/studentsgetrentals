'use client';

import React from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

type CustomInputOTPProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function CustomInputOTP({ value, setValue }: CustomInputOTPProps) {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      disabled={value.length === 6}
      onChange={(value) => setValue(value)}
      onPaste={(e: ClipboardEvent) =>
        setValue(e.clipboardData?.getData('text') as string)
      }
      render={({ slots }) => (
        <InputOTPGroup className='gap-2'>
          {slots.map((slot, index) => (
            <React.Fragment key={index}>
              <InputOTPSlot className='rounded-md border' {...slot} />
              {index !== slots.length - 1 && <InputOTPSeparator />}
            </React.Fragment>
          ))}{' '}
        </InputOTPGroup>
      )}
    />
  );
}
