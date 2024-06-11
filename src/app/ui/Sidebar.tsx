"use client";
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Sidebar() {
  return (
    <div className="w-1/4 max-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      <div className="w-full mb-4 text-xs">
        <ConnectButton chainStatus="icon"/>
      </div>
      <div className='h-96'></div>
      <Button className="bg-gray-700 w-full py-2 rounded mb-4">Dex Dashboard</Button>
      <Button className="bg-gray-700 w-full py-2 rounded" onClick={() => signOut({ callbackUrl: '/signin' })}>Logout</Button>
    </div>
  );
}
