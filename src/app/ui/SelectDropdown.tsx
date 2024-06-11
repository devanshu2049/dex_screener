"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface SelectDropdownProps {
  chainOptions: { value: string; label: string }[];
  setSelectedChain: (theme: string) => void;
}

export default function SelectDropdown({ chainOptions, setSelectedChain }: SelectDropdownProps) {
  return (
    <Select onValueChange={(value) => setSelectedChain(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ethereum" />
      </SelectTrigger>
      <SelectContent>
        {chainOptions.map((option:any) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
