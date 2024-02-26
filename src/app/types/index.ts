export interface CurrencyType {
    amount: number;
    currency: string;
}


export interface Policy {
    id: string;
    FundIds: number[];
    balance: {
        amount: number;
        currency?: 'NIS';
    };
    ownersId?: string[];
}


export interface Fund {
    id: number;
    name: string;
    type: string;
    manager: string;
    investingPolisy: string;
}