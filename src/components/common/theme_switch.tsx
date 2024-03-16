'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

import { Button } from '../ui/button';

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      {resolvedTheme === 'dark' ? (
        <Button variant={'ghost'} onClick={() => setTheme('light')}>
          <FaSun size={36} />
        </Button>
      ) : resolvedTheme === 'light' ? (
        <Button variant={'ghost'} onClick={() => setTheme('dark')}>
          <FaMoon size={36} />
        </Button>
      ) : null}

      <span className='sr-only'>Light and dark theme toggle switch</span>
    </div>
  );
};
