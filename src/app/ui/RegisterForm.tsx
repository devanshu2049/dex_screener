"use client"
import { useSession } from "next-auth/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'; 

export default function RegisterForm() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const {address: walletAddress, isConnected } = useAccount(); 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
      if (status === "authenticated") {
        router.replace("/dashboard");
      }
    }, [status, router]); 

    
    useEffect(() => {
      if (walletAddress) {
        setAddress(walletAddress);
      }
    },[walletAddress])

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
          setError("Invalid email address.");
          return;
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters long.");
          return;
        }
        setIsLoading(true);
        try {
          const res = await fetch("api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              address 
            }),
          });
    
          if (res.ok) {
            router.push('/signin');
          } else {
            const resp = await res.json()
            setError(resp.error);
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      const handleInputChange = (setter:any) => (e: any) => {
        setter(e.target.value);
        setError(""); 
      }

      return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
          <div className="bg-[#1f2937] shadow-lg p-5 rounded-lg text-white max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                onChange={handleInputChange(setEmail)}
                type="text"
                placeholder="Email"
                className="bg-gray-700 text-white rounded-lg px-3 py-2"
                required
              />
              <input
                onChange={handleInputChange(setPassword)}
                type="password"
                placeholder="Password"
                required
                className="bg-gray-700 text-white rounded-lg px-3 py-2"
              />
              <ConnectButton 
                chainStatus="icon" 
                showBalance={false} 
              />
              {isConnected && (
                <Button className="bg-gray-600 hover:bg-gray-700 text-white font-bold cursor-pointer px-6 py-2 rounded-lg">
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              )}
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
            </form>
          </div>
        </div>
      );
}