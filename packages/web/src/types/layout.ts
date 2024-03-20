import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type NextPageWithLayout<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  children: React.ReactNode;
};
