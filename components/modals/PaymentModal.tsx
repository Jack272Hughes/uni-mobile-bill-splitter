import React, { useEffect, useState } from "react";
import {
	Button,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";
import { Item, PaymentPercentage } from "../../types";
import { ColourCodedPerson } from "../../utils/StringToColourHex";

export type PaymentModalData = {
	payments: PaymentPercentage[];
};

type ModalProps = {
	item: Item;
	people: ColourCodedPerson[];
	visible: boolean;
	onSubmit: (data: PaymentModalData) => void;
	onCancel: () => void;
};

export default function PaymentModal(props: ModalProps) {
	const [selectedName, setSelectedName] = useState("");
	const [percentage, setPercentage] = useState("");
	const [payments, setPayments] = useState<PaymentPercentage[]>(
		props.item.payments.slice()
	);
	const [useQuantity, setUseQuantity] = useState(true);

	const onSubmit = () => {
		props.onSubmit({ payments });
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
					Manage Payments
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
