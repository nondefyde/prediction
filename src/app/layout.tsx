"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import '../styles/_override.scss'
import { persistor, store } from "@mpr/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import React, { ReactElement, Suspense } from "react";
import { Provider } from "react-redux";
import { AppLoader, NetWorkDetector } from "@mpr/_shared/components";

const inter = Inter({ subsets: ['latin'] })

export interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Suspense fallback={<AppLoader />}>
              <NetWorkDetector>
                {children}
              </NetWorkDetector>
            </Suspense>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
