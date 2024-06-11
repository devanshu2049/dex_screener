import { NextResponse } from 'next/server';
import query from '@/lib/graphqlSchema';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

export async function GET() {
    try {
        const cachedData = cache.get('uniswapData');

        if (cachedData) {
            // console.log(cachedData.data.swaps,'====>')
            return NextResponse.json(cachedData);
        }

        const response = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data.data.swaps, "uniswap");
        cache.set('uniswapData', data);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
