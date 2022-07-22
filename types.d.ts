export type TransactionInfo = {
	name: string;
	date: string;
};

export type Payment = {
	person: string;
	percentage: number;
};

export type Item = {
	name: string;
	quantity: number;
	price: number;
	payments: Payment[];
};

export type Transaction = {
	people: string[];
	items: Item[];
};
