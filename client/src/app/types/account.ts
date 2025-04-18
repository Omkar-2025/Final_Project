export interface AccountType {
    id?: number;
    userId: number;
    accountNumber: string;
    account_type: string;
    balance: number;
    createdAt?: Date;
    name:string
    isVerified:boolean
    // updatedAt?: Date;
}

// { name: string, balance: number, account_type: string, id: number, account_number: string }