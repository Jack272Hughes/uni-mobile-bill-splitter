import { Item } from "../types";

export default class ComputedItem {
	private readonly item: Item;
	private readonly totalPrice: number;
	private readonly paidQuantity: number;
	private readonly remainder: number;

	constructor(item: Item) {
		this.item = item;

		this.totalPrice = item.price * item.quantity;
		this.paidQuantity = item.payments.reduce(
			(acc, payment) => (acc += payment.quantity),
			0
		);
		this.remainder = (item.quantity - this.paidQuantity) * item.price;
	}

	public hasAvailableQuantity(): boolean {
		return this.paidQuantity < this.item.quantity;
	}

	public getItem() {
		return this.item;
	}

	public getTotalPrice() {
		return this.totalPrice;
	}

	public getPaidQuantity() {
		return this.paidQuantity;
	}

	public getRemainder() {
		return this.remainder;
	}
}
