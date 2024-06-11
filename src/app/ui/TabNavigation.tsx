"use client";
import { Button } from '@/components/ui/button';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

export default function TabNavigation({ activeTab, setActiveTab, tabs }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start space-x-2 mb-4 lg:mb-0">
      {tabs.map((tab: any) => (
        <Button 
          key={tab} 
          onClick={() => setActiveTab(tab)} 
          className={`py-2 px-4 ${activeTab === tab ? 'bg-gray-700 text-white' : 'bg-gray-400 text-gray-800'} rounded-lg`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}

// export default function TabNavigation({ activeTab, setActiveTab, tabs }: TabNavigationProps) {
//   return (
//     <div className="flex space-x-4">
//       {tabs.map((tab:any) => (
//         <Button 
//           key={tab} onClick={() => setActiveTab(tab)} 
//           className={`py-2 px-4 ${activeTab === tab ? 'bg-gray-700' : 'bg-gray-400'}`}>
//           {tab}
//         </Button>
//       ))}
//     </div>
//   );
// }
