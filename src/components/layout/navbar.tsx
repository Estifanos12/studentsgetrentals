'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ThemeSwitch } from '../common/theme_switch';
import { siteConfig } from '@/config/site';
import { navLinks } from '@/lib/links';
import { Logout } from '../common/logout';
import { SignIn } from '../common/signIn';

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const { status } = useSession();

  const handleClick = async () => {
    setNavbar(false);
  };

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navbar]);

  return (
    <header className='select-none'>
      <nav className='mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl'>
        <div>
          <div className='flex items-center justify-between py-3 md:block md:py-5'>
            <Link href='/' onClick={handleClick}>
              <h1 className=' className="scroll-m-20 text-2xl text-foreground font-semibold tracking-tight lg:text-3xl"'>
                {siteConfig.name}.
              </h1>
            </Link>
            <div className='flex gap-1 md:hidden'>
              <button
                className='rounded-md p-2 text-primary outline-none focus:border focus:border-foreground'
                aria-label='Hamburger Menu'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-foreground'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-foreground'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
              <ThemeSwitch />
            </div>
          </div>
        </div>
        <div>
          <div
            className={`absolute left-0 right-0 z-10 m-auto w-full justify-self-center rounded-md border  p-4 md:static md:mt-0 md:block md:border-none md:p-0 transition-all ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='flex flex-col items-center space-y-4 text-foreground md:flex-row md:space-x-6 md:space-y-0'>
              {navLinks.map((link) => {
                if (link.path) {
                  return (
                    <li key={link.route}>
                      <Link
                        href={link.path}
                        target={link.route === 'Learn' ? '_blank' : '_self'}
                        className='mr-4 hover:underline md:mr-6 hover:text-primary'
                      >
                        {link.route}
                      </Link>
                    </li>
                  );
                }
                if (link.route === 'Log Out') {
                  return (
                    <div className='md:hidden' key={link.route}>
                      {status === 'authenticated' ? (
                        <Logout />
                      ) : status === 'unauthenticated' ? (
                        <SignIn />
                      ) : null}
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-2 '>
          <ThemeSwitch />
          {status === 'authenticated' ? (
            <Logout />
          ) : status === 'unauthenticated' ? (
            <SignIn />
          ) : null}
        </div>
      </nav>
    </header>
  );
}
