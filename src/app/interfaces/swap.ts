export interface Transaction {
    id: string;
    gasUsed: string;
    timestamp: string;
    blockNumber: string;
}

export interface Token {
    id: string;
    symbol?: string;
}

export interface Swap {
    transaction: Transaction;
    sender: string;
    recipient: string;
    origin: string;
    amount0: string;
    amount1: string;
    amountUSD: string;
    token0: Token;
    token1: Token;
}
