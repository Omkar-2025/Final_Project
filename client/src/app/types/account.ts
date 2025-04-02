export interface AccountType {
    id?: number;
    userId: number;
    accountNumber: string;
    accountType: string;
    balance: number;
    createdAt?: Date;
    // updatedAt?: Date;
}

// { name: string, balance: number, account_type: string, id: number, account_number: string }