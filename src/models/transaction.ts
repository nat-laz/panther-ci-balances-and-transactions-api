export interface Transaction {
    amount: number;
    currency: string;
    date: string;
    status: "CANCELLED" | "PROCESSED" | "BOOKED";
}