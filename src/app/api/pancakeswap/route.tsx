import { NextResponse } from 'next/server';
import query from '@/lib/graphqlSchema';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

export async function GET() {
    try {
        const cachedData = cache.get('pancakeswapData');

        if (cachedData) {
            return NextResponse.json(cachedData);
        }
        const response = await fetch('https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc', {
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
        cache.set('pancakeswapData', data);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}