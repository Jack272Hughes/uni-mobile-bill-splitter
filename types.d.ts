export type TransactionInfo = {
	name: string;
	date: string;
};

export type Payment = {
	person: string;
	amount: number;
};

export type ItemPayment = {
	item: string;
	amount: number;
};

export type PaymentPercentage = {
	person: string;
	percentage: number;
};

export type Item = {
	name: string;
	quantity: number;
	price: number;
	payments: PaymentPercentage[];
};

export type Transaction = {
	people: string[];
	items: Item[];
};

export type RoundedPayments = {
	payments: Payment[];
	remainder: number;
};

export type CollectedPayments = {
	total: number;
	remainder: number;
	payments: Map<string, ItemPayment[]>;
};
