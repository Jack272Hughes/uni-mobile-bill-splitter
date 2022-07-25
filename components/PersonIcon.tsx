import React from "react";
import { Button } from "react-native-paper";
import { ColourCodedPerson } from "../utils/StringToColourHex";

type PersonProps = {
	person: ColourCodedPerson;
	isSelected?: boolean;
	onPress?: () => void;
	gap?: number;
};

export default function PersonIcon(props: PersonProps) {
	return (
		<Button
			style={{ borderRadius: 100, margin: 4 }}
			mode="contained"
			color={props.person.getHexColour()}
			onPress={props.onPress}
		>
			{props.isSelected
				? props.person.getName()
				: props.person.getInitials()}
		</Button>
	);
}
