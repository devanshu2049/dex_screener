"use client"
import { Suspense, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Sidebar from '../ui/Sidebar';
import TabNavigation from '../ui/TabNavigation';
import SelectDropdown from '../ui/SelectDropdown';
import TableList from '../ui/TableList';
import { useRouter } from 'next/navigation';
import { Swap } from '../interfaces/swap';


export default function Dashboard() {
  
  const [activeTab, setActiveTab] = useState('All');
  const [selectedChain, setSelectedChain] = useState('Ethereum'); 
  const [swapTxn, setSwapTxn] = useState<Swap[]>([]);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const tabs = ['All', 'Uniswap', 'Pancakeswap'];


  const chainOptions = [
    { value: "Ethereum", label: "Ethereum" },
    { value: "Polygon", label: "Polygon" },
    { value: "Arbitum", label: "Arbitum" },
  ];



  useEffect(() => {
    let timerId:any
    if (status === "loading") return;

    if (status === "unauthenticated") {
      timerId = setTimeout(()=>{
        router.replace('/signin')
      },2000)
    
    }
    if (!session) {
      timerId = setTimeout(()=>{
        router.replace('/signin')
      },2000)
      router.replace('/signin');
    }
    return(()=>{
      clearTimeout(timerId)
    })
  }, [session, status, router]);

  useEffect(() => {
    const getUniswapTxns = async () => {
      try {
        const response = await fetch('/api/uniswap',{ cache: 'no-store' });
        const uniswapSwaps = await response.json();
        return uniswapSwaps.data.swaps.map((swap: Swap) => ({ ...swap, dex: 'uniswap' }));
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    const getPancakeswapTxns = async () => {
      try{
        const response = await fetch('/api/pancakeswap', { cache: 'no-store' });
        const pancakeswapSwaps = await response.json();
        return pancakeswapSwaps.data.swaps.map((swap: Swap) => ({ ...swap, dex: 'pancakeswap' }));
      } catch(error) {
        console.log(error)
        return []
      }
    }
    const getAllSwapTxns = async () => {
      setIsLoading(true);
      try {
        let dexPromises = [];
        if(activeTab === "Uniswap") {
          dexPromises = [getUniswapTxns()];
        } else if(activeTab === "Pancakeswap"){
          dexPromises = [getPancakeswapTxns()];
        } else{
          dexPromises = [getUniswapTxns(), getPancakeswapTxns()];
        }
        const results = await Promise.all(dexPromises);
        let resultTxns = [];
        if (activeTab === "Uniswap" || activeTab === "Pancakeswap") {
            resultTxns = results[0];
        } else {
            resultTxns = [...results[0], ...results[1]];
        }
        setSwapTxn(resultTxns);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllSwapTxns();
  }, [activeTab]);


  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>You are not logged in. Redirecting to sign-in page...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }


  return (
<Suspense>
      <div className="flex flex-col lg:flex-row h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            {/* <SelectDropdown chainOptions={chainOptions} setSelectedChain={setSelectedChain} /> */}
          </div>
          <TableList txns={swapTxn} isLoading={isLoading} />
        </div>
      </div>
    </Suspense>
    // <Suspense>
    // <div className="flex h-screen">
    //   <Sidebar />
    //   <div className="flex-1 bg-gray-100 p-4">
    //     <div className="flex justify-between items-center mb-4">
    //       <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
    //       <SelectDropdown chainOptions={chainOptions} setSelectedChain={setSelectedChain} />
    //     </div>
    //     <TableList txns={swapTxn} isLoading={isLoading}/>
    //   </div>
    // </div>
    // </Suspense>
  );
}

