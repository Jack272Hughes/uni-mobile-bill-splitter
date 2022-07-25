import { Item } from "../types";

export default class ComputedItem {
	private readonly item: Item;
	private readonly price: number;
	private readonly paidQuantity: number;
	private readonly remainder: number;

	constructor(item: Item) {
		this.item = item;

		this.price = item.price * item.quantity;
		this.paidQuantity = item.payments.length;
		this.remainder = (item.quantity - this.paidQuantity) * item.price;
	}

	public getItem() {
		return this.item;
	}

	public getPrice() {
		return this.price;
	}

	public getPaidQuantity() {
		return this.paidQuantity;
	}

	public getRemainder() {
		return this.remainder;
	}
}
