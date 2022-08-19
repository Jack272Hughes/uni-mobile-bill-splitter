export type TransactionInfo = {
	name: string;
	date: string;
};

export type TransactionDefinition = {
	name: string;
	date: string;
	imageUri?: string;
};

export type Payment = {
	person: string;
	amount: number;
};

export type ItemPayment = {
	item: string;
	amount: number;
};

export type PaymentQuantity = {
	people: string[];
	quantity: number;
};

export type Item = {
	name: string;
	quantity: number;
	price: number;
	payments: PaymentQuantity[];
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

export type ModalInfo = {
	type: ModalType;
	dataName?: string;
};
