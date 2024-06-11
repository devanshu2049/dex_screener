"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./provider";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';
import { useRouter } from "next/navigation";



const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = useRouter() as unknown as { locale: Locale };

  return (
    <html><body>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale}>
              <AuthProvider>
                <div>{children}</div>
              </AuthProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        </body>
        </html>
  );
}
