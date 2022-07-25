import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
	Button,
	HelperText,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";
import { Item } from "../../types";

export type ItemModalData = {
	name: string;
	quantity: number;
	price: number;
};

type ModalProps = {
	visible: boolean;
	onSubmit: (data: ItemModalData) => void;
	onCancel: () => void;
	item?: Item;
};

export default function ItemModal(props: ModalProps) {
	const { item } = props;
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [shouldShowWarnings, setShouldShowWarnings] = useState(false);

	useEffect(() => {
		if (item) {
			setName(item.name);
			setQuantity(item.quantity.toString());
			setPrice((item.price / 100).toString());
		} else {
			resetValues();
		}
	}, [props.item]);

	const resetValues = () => {
		setName("");
		setQuantity("");
		setPrice("");
		setShouldShowWarnings(false);
	};

	const isValidQuantity = quantity.length > 0 && /^\d+$/.test(quantity);
	const isValidPrice = price.length > 0 && /^\d+(\.\d{1,2})?$/.test(price);

	const onSubmit = () => {
		if (name !== "" && isValidQuantity && isValidPrice) {
			props.onSubmit({
				name,
				quantity: Number.parseInt(quantity),
				price: Math.floor(Number.parseFloat(price) * 100)
			});
			resetValues();
		} else {
			setShouldShowWarnings(true);
		}
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
						textAlign: "center",
						marginBottom: 10
					}}
				>
					{props.item ? "Edit" : "Add"} Item
				</Text>
				<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
					<TextInput
						mode="outlined"
						label="Item Name"
						value={name}
						onChangeText={setName}
					/>
					{shouldShowWarnings && name === "" && (
						<HelperText type="error">
							Value should not be empty
						</HelperText>
					)}
				</View>

				<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
					<TextInput
						mode="outlined"
						label="Quantity"
						keyboardType="numeric"
						value={quantity}
						onChangeText={setQuantity}
						left={<TextInput.Affix text="#" />}
					/>
					{shouldShowWarnings && !isValidQuantity && (
						<HelperText type="error">
							{quantity.length > 0
								? "Invalid quantity"
								: "Value should not be empty"}
						</HelperText>
					)}
				</View>

				<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
					<TextInput
						mode="outlined"
						label="Price"
						keyboardType="decimal-pad"
						value={price}
						onChangeText={setPrice}
						left={<TextInput.Affix text="£" />}
					/>
					{shouldShowWarnings && !isValidPrice && (
						<HelperText type="error">
							{price.length > 0
								? "Invalid price"
								: "Value should not be empty"}
						</HelperText>
					)}
				</View>

				<Button
					mode="contained"
					onPress={onSubmit}
					style={{
						margin: 10,
						marginHorizontal: 50,
						marginBottom: 30
					}}
				>
					{props.item ? "Update" : "Add"}
				</Button>
			</Modal>
		</Portal>
	);
}
