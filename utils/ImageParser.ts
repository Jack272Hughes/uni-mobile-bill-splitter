import { Item } from "../types";
import ReadImageModule from "./ReadImageModule";

const itemRegex = /^([\dI]+)\s*(.*?[a-zA-Z]+.*?)\s*£?([\dI]{1,2}\.[\dI]{1,2})$/;

export default function processImage(imageUri: string): Promise<Item[]> {
	return new Promise((resolve, reject) => {
		ReadImageModule.processImage(imageUri.replace("file://", ""))
			.then(result => {
				if (!result) return;
				resolve(
					result.reduce((items: Item[], line: string) => {
						const matches = line.match(itemRegex);
						if (matches) {
							matches[1] = matches[1].replace("I", "1");
							matches[3] = matches[3].replace("I", "1");
							items.push({
								quantity: Number.parseInt(matches[1]),
								name: matches[2],
								price: Number.parseFloat(matches[3]) * 100,
								payments: []
							});
						}
						return items;
					}, [])
				);
			})
			.catch(err => reject(err));
	});
}
