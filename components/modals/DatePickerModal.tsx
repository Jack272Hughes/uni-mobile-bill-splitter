import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { Button, Modal, Portal } from "react-native-paper";

type DatePickerModalProps = {
	date?: string;
	onSave: (date: string) => void;
	onDismiss: () => void;
};

export default function DatePickerModal(props: DatePickerModalProps) {
	const [date, setDate] = useState(
		props.date
			? new Date(props.date.split("/").reverse().join("/"))
			: new Date()
	);

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
				<DatePicker mode="date" date={date} onDateChange={setDate} />
				<Button
					mode="contained"
					onPress={() =>
						props.onSave(date.toLocaleDateString("en-GB"))
					}
				>
					Save
				</Button>
			</Modal>
		</Portal>
	);
}
