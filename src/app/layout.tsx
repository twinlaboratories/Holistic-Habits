'use client';

import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import AnimationInitializer from '@/components/AnimationInitializer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Holistic:Habits - Optimize Your Sleep</title>
        <meta name="description" content="Scientifically-researched health products for biohackers to optimize sleep and wellbeing." />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <AnimationInitializer />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 