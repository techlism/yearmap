import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeSwitch';

const dmSans = DM_Sans({
  subsets: ['latin'],
  preload: true
});

export const metadata: Metadata = {
  title: 'YearMap',
  description: 'Track every day of your year',
  authors: {
    name: "Kundan",
    url: "https://techlism.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body className={`${dmSans.className} antialiased`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}