import { Item } from "../types";

export default class ComputedItem {
	private readonly item: Item;
	private readonly price: number;
	private readonly percentage: number;
	private readonly remainder: number;

	constructor(item: Item) {
		this.item = item;

		this.price = item.price * item.quantity;
		this.percentage = item.payments.reduce(
			(acc, payment) => (acc += payment.percentage),
			0
		);
		this.remainder =
			Math.floor(this.price - (this.percentage * this.price) / 100) / 100;
	}

	public getItem() {
		return this.item;
	}

	public getPrice() {
		return this.price;
	}

	public getTotalPercentage() {
		return this.percentage;
	}

	public getRemainder() {
		return this.remainder;
	}
}
