import React from "react";
import { ScrollView, ViewStyle } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { ColourCodedPerson } from "../../utils/ColourCodedPerson";
import PersonIcon from "../PersonIcon";

type PickerModalProps = {
	people: ColourCodedPerson[];
	onSelect: (person: ColourCodedPerson) => void;
	onDismiss: () => void;
};

export default function PickerModal(props: PickerModalProps) {
	return (
		<Portal>
			<Modal
				visible
				onDismiss={props.onDismiss}
				contentContainerStyle={{
					backgroundColor: "white",
					padding: 20,
					margin: 30,
					marginVertical: 100,
					borderRadius: 10
				}}
			>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center",
						marginBottom: 10
					}}
				>
					Select Person
				</Text>
				<ScrollView>
					{props.people.map(person => {
						return (
							<PersonIcon
								onPress={() => props.onSelect(person)}
								isSelected
								person={person}
							/>
						);
					})}
				</ScrollView>
			</Modal>
		</Portal>
	);
}
