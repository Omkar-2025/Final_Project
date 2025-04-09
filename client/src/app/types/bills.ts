

// {
//     "amount": 200,
//     "transactionType": " Bill Payment  Pratik Landuary",
//     "id": 140,
//     "createdAt": "2025-04-08T09:10:11.083Z"
// },

export interface BillType {
    id: number;
    amount: number;
    transactionType: string;
    createdAt: string;
}