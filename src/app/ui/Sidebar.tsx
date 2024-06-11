"use client";
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Sidebar() {
  return (
    <div className="w-full lg:w-1/5 max-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      <div className="w-full mb-4">
        <ConnectButton chainStatus="icon" showBalance={false}/>
      </div>

      <div className="flex flex-col w-full h-full justify-between">
        <div className="bg-gray-700 w-full py-3 rounded mb-6 text-center text-lg font-semibold">
          Dex Dashboard
        </div>

        <div className="flex-1"></div> {/* This div acts as a spacer */}

        <Button
          className="bg-gray-700 w-full py-2 rounded mt-6 hover:bg-gray-600"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
// export default function Sidebar() {
//   return (
//     <div className="w-1/5 max-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
//       <div className="w-full mb-4 text-xs">
//         <ConnectButton chainStatus="icon" />
 

//       </div>
//       <div className='h-96'>

//       </div>

//       <div className="flex flex-col w-full h-full justify-between">
//         <div className="bg-gray-700 w-full py-2 rounded mb-4 flex justify-center">
//           Dex Dashboard
//         </div>

//         <Button
//           className="bg-gray-700 w-full py-2 rounded "
//           onClick={() => signOut({ callbackUrl: "/signin" })}
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }
