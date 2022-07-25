import { Payment } from "../types";

export default class SortedPayments {
	private readonly array: Payment[] = [];

	constructor(array?: Payment[]) {
		array?.forEach(this.add);
	}

	public getAll() {
		return this.array;
	}

	public get(index: number): Payment {
		return this.array[index];
	}

	public add(value: Payment): void {
		const indexToInsert = this.array.findIndex(
			num => value.amount % 1 >= num.amount % 1
		);
		if (indexToInsert < 0) this.array.push(value);
		else this.array.splice(indexToInsert, 0, value);
	}
}
