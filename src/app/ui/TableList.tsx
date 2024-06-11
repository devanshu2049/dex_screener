"use client";
import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function TableList({ txns, isLoading }:any) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const formatTxns = (txns: string) => {
    return `${txns.slice(0, 2)}...${txns.slice(-3)}`;
  };


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading transactions...</p>
      </div>
    );
  }
  
  txns.sort((a: any, b: any) => b.transaction.timestamp - a.transaction.timestamp);

  const paginatedData = txns.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(txns.length / rowsPerPage);
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>DEX Swap Transactions</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>hash</TableHead>
              <TableHead>from token</TableHead>
              <TableHead>to token</TableHead>
              <TableHead>Gas</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>from</TableHead>
              <TableHead>to</TableHead>
              <TableHead>Block No./DEX</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell>    <a
      href={`https://${row.dex === "uniswap" ? "etherscan.io" : "bscscan.com"}/tx/${row.transaction.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {formatTxns(row.transaction.id)}
    </a></TableCell>
                <TableCell>{parseFloat(row.amount0) > 0 ? `${parseFloat(row.amount0).toFixed(3)} ${row.token0.symbol}`  :`${parseFloat(row.amount1).toFixed(3)} ${row.token1.symbol}`}</TableCell>
                <TableCell>{parseFloat(row.amount1) < 0 ? `${Math.abs(row.amount1).toFixed(3)} ${row.token1.symbol}` : `${Math.abs(row.amount0).toFixed(3)} ${row.token0.symbol}`}</TableCell>
                <TableCell>{row.transaction.gasUsed}</TableCell>
                <TableCell>{row.transaction.timestamp}</TableCell>
                <TableCell>{formatTxns(row.origin)}</TableCell>
                <TableCell>{formatTxns(row.recipient)}</TableCell>
                <TableCell>{`${row.transaction.blockNumber}/${row.dex}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        <div className="flex justify-between items-center mt-4 space-x-2">
          <button
            className="py-2 px-4 bg-gray-400 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="py-2 px-4 bg-gray-400 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
