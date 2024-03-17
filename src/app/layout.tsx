import './globals.css';
import { Nunito } from 'next/font/google';
import { SessionProvider, ThemeProvider } from './providers';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Students Get Rentals',
  description: 'platform for students to get rentals',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${font.className} flex min-h-screen flex-col bg-background dark:bg-[#111111] text-primary`}
      >
        <SessionProvider>
          <ThemeProvider>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
