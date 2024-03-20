'use client';

import './globals.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import TRPCProvider from './api/trpc/_trpc/Provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TRPCProvider>
            <ChakraProvider>
              <Flex mt="65px" w="100%" direction="column">
                {children}
              </Flex>
            </ChakraProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
