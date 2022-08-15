import React, { useState } from "react";
import {
	Button,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";
import { TransactionInfo } from "../../types";
import DatePickerModal from "./DatePickerModal";

type TransactionModalProps = {
	transaction?: TransactionInfo;
	onSubmit: (transactionInfo: TransactionInfo) => void;
	onDismiss: () => void;
};

export default function TransactionModal(props: TransactionModalProps) {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState(props.transaction?.name || "");
	const [date, setDate] = useState(
		props.transaction?.date || new Date().toLocaleDateString("en-GB")
	);

	const createTransaction = () => {
		if (name.length > 0 && date.length > 0) {
			props.onSubmit({ name, date });
		}
	};

	return (
		<Portal>
			{showModal && (
				<DatePickerModal
					date={date}
					onSave={date => {
						setDate(date);
						setShowModal(false);
					}}
					onDismiss={() => setShowModal(false)}
				/>
			)}
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
				<IconButton
					size={32}
					icon="close"
					onPress={props.onDismiss}
					style={{ alignSelf: "flex-end", margin: 0 }}
				/>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center",
						marginBottom: 10
					}}
				>
					{props.transaction ? "Edit" : "Add"} Transaction
				</Text>
				<TextInput
					style={{ marginHorizontal: 20, marginVertical: 10 }}
					mode="outlined"
					label="Transaction Name"
					value={name}
					onChangeText={setName}
				/>
				<Button
					style={{
						marginHorizontal: 20,
						marginVertical: 10,
						borderWidth: 1
					}}
					mode="outlined"
					onPress={() => setShowModal(true)}
				>
					{date}
				</Button>
				<Button
					mode="contained"
					onPress={() => createTransaction()}
					style={{
						margin: 10,
						marginHorizontal: 50,
						marginBottom: 30
					}}
				>
					{props.transaction ? "Update" : "Create"}
				</Button>
			</Modal>
		</Portal>
	);
}
