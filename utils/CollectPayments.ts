import {
	CollectedPayments,
	Item,
	ItemPayment,
	Payment,
	Transaction
} from "../types";
import ComputedItem from "./ComputedItem";

function splitPayment(amount: number, people: string[]): Payment[] {
	const perPerson = Math.floor(amount / people.length);
	const remainder = amount - perPerson * people.length;

	return people.map((person, index) => {
		const payment: Payment = { person, amount: perPerson };
		if (index < remainder) payment.amount++;
		return payment;
	});
}

function calculateItemPayments(item: Item): Map<string, number> {
	let payments: Payment[] = [];
	item.payments.forEach(paymentQuantity => {
		const total = item.price * paymentQuantity.quantity;
		if (paymentQuantity.people.length === 1) {
			payments.push({ person: paymentQuantity.people[0], amount: total });
		} else {
			payments = payments.concat(
				splitPayment(total, paymentQuantity.people)
			);
		}
	});

	return payments.reduce((acc, payment) => {
		if (acc.has(payment.person))
			acc.set(payment.person, acc.get(payment.person) + payment.amount);
		else acc.set(payment.person, payment.amount);
		return acc;
	}, new Map());
}

export default function collectPayments(
	transaction: Transaction
): CollectedPayments {
	const payments: Map<string, ItemPayment[]> = transaction.people.reduce(
		(acc, person) => acc.set(person, []),
		new Map()
	);
	const collectedPayments: CollectedPayments = {
		total: 0,
		remainder: 0,
		payments: payments
	};

	transaction.items.forEach(item => {
		const computedItem = new ComputedItem(item);
		collectedPayments.total += computedItem.getTotalPrice();
		collectedPayments.remainder += computedItem.getRemainder();

		const itemPayments = calculateItemPayments(item);

		Array.from(itemPayments.entries()).forEach(([person, amount]) => {
			payments.get(person)!.push({ item: item.name, amount: amount });
		});
	});

	return collectedPayments;
}
