'use client';

import { z } from 'zod';

export const registerSchema = z
  .object({
    fullname: z.string().min(1, {
      message: 'Full name is required',
    }),
    email: z.string().email().min(1, {
      message: 'Email is required',
    }),
    password: z.string().min(4, {
      message: 'Password is required and must be at least 4 characters long',
    }),
    confirm_password: z.string().min(4, {
      message: 'Confirm password is required',
    }),
    agree_terms: z.boolean().default(false),
  })
  .superRefine(({ confirm_password, password, agree_terms }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });
    }
    if (agree_terms !== true) {
      ctx.addIssue({
        code: 'custom',
        path: ['agree_terms'],
        message: 'You must agree to the terms and conditions to continue',
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const enterEmailSchema = z.object({
  email: z.string().email(),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(4, {
      message: 'Password must contain at least 4 characters long',
    }),
    confirm_password: z.string(),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });
    }
  });
