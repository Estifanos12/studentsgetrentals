import { signOut } from 'next-auth/react';

export const navLinks = [
  {
    route: 'Home',
    path: '/',
  },
  {
    route: 'Features',
    path: '/#features',
  },
  {
    route: 'Services',
    path: '/#services',
  },
  {
    route: 'Log Out',
    onclick: () => signOut(),
  },
  {
    route: 'Learn',
    path: '/learn',
  },
];
