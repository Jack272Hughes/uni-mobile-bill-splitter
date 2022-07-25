import React, { useEffect, useState } from "react";
import {
	Button,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";

type PayeeModalData = {
	name: string;
};

type ModalProps = {
	payee?: string;
	visible: boolean;
	onSubmit: (data: PayeeModalData) => void;
	onCancel: () => void;
};

export default function PayeeModal(props: ModalProps) {
	const [name, setName] = useState("");

	useEffect(() => {
		if (props.payee) {
			setName(props.payee);
		} else {
			setName("");
		}
	}, [props.payee]);

	const onSubmit = () => {
		props.onSubmit({ name });
		setName("");
	};

	return (
		<Portal>
			<Modal
				visible={props.visible}
				onDismiss={props.onCancel}
				contentContainerStyle={{
					backgroundColor: "white",
					padding: 10,
					margin: 30,
					borderRadius: 10
				}}
			>
				<IconButton
					size={32}
					icon="close"
					onPress={props.onCancel}
					style={{ alignSelf: "flex-end", margin: 0 }}
				/>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center"
					}}
				>
					{props.payee ? "Edit" : "Add"} Payee
				</Text>
				<TextInput
					mode="outlined"
					label="Payee Name"
					value={name}
					onChangeText={setName}
					style={{ margin: 20 }}
				/>
				<Button
					mode="contained"
					onPress={onSubmit}
					style={{
						margin: 10,
						marginHorizontal: 50,
						marginBottom: 30
					}}
				>
					{props.payee ? "Update" : "Add"}
				</Button>
			</Modal>
		</Portal>
	);
}
