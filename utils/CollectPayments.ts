import {
	CollectedPayments,
	ItemPayment,
	PaymentPercentage,
	RoundedPayments,
	Transaction
} from "../types";
import SortedPayments from "./SortedPayments";

function roundPayments(
	total: number,
	payments: PaymentPercentage[]
): RoundedPayments {
	const sortedPayments = new SortedPayments();
	let remainder = total;
	let totalPercentage = 0;

	payments.forEach(payment => {
		const amount = (payment.percentage * total) / 100;
		const normalisedAmount = Math.floor(amount);

		sortedPayments.add({ person: payment.person, amount });
		totalPercentage += payment.percentage;
		remainder -= normalisedAmount;
	});

	if (totalPercentage > 99.99 && remainder > 0) {
		for (let index = 0; index < remainder; index++) {
			sortedPayments.get(index).amount++;
		}
		remainder = 0;
	}

	return {
		remainder,
		payments: sortedPayments.getAll().map(payment => {
			return {
				person: payment.person,
				amount: Math.floor(payment.amount)
			};
		})
	};
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
		const totalPrice = item.price * item.quantity;
		collectedPayments.total += totalPrice;

		const roundedPayments = roundPayments(totalPrice, item.payments);
		collectedPayments.remainder += roundedPayments.remainder;

		roundedPayments.payments.forEach(payment => {
			payments
				.get(payment.person)
				?.push({ item: item.name, amount: payment.amount });
		});
	});

	return collectedPayments;
}
