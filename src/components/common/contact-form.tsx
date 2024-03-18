'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ContactFormSchema } from '@/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardTitle } from '../ui/card';

export const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: '',
      name: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card className='p-7 dark:bg-transparent'>
      <CardTitle className='mb-4 text-lg text-foreground'>Contact Us</CardTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col items-center w-full gap-10'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col items-start'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col items-start'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col items-start'>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter your message'
                    {...field}
                    minLength={5}
                    maxLength={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='Submit' className='mt-5'>
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};
