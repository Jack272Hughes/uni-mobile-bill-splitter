function stringToColourHex(str: string): string {
	let hash: number = 0;
	for (var i = 0; i < str.length; i++) {
		// Convert every character to a number and bit shift left
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	let colour: string = "#";
	for (var i = 0; i < 3; i++) {
		// Bit shift to the right and then perform bitwise AND operator with 255
		// This ensures the resulting number is only 8 bits long
		const value: number = (hash >> (i * 8)) & 0xff;
		// Convert base10 value to a base16 value
		// Since "value" is only 8 bits, the maximum base16 value is "FF"
		// Pad with zeros for when "value" is 0-15 AKA 0-F in base16
		colour += ("00" + value.toString(16)).slice(-2);
	}
	return colour;
}

export class ColourCodedPerson {
	private readonly name: string;
	private readonly hexColour: string;
	private readonly initials: string;

	constructor(name: string) {
		this.name = name;
		this.hexColour = stringToColourHex(name);
		this.initials = name
			.split(/\s+|-/)
			.reduce(
				(acc, nameSegment) =>
					acc + nameSegment.slice(0, 1).toUpperCase(),
				""
			);
	}

	public getName(): string {
		return this.name;
	}

	public getHexColour(): string {
		return this.hexColour;
	}

	public getInitials(): string {
		return this.initials;
	}
}
