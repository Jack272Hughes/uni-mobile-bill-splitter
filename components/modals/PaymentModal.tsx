import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import {
	Button,
	DataTable,
	DefaultTheme,
	Divider,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";
import { Item, PaymentPercentage, RoundedPayments } from "../../types";
import { roundPayments } from "../../utils/CollectPayments";
import { ColourCodedPerson } from "../../utils/ColourCodedPerson";
import NumberBubble from "../NumberBubble";
import RemainderDisplay from "../RemainderDisplay";
import PickerModal from "./PickerModal";

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
	const [showModal, setShowModal] = useState(false);
	const [selectedName, setSelectedName] = useState("");

	const [useQuantity, setUseQuantity] = useState(true);
	const [value, setValue] = useState("");

	const totalPrice = useMemo(
		() => props.item.price * props.item.quantity,
		[props.item]
	);
	const [payments, setPayments] = useState(props.item.payments);

	const collectedPaymentsMap: Map<string, number> = new Map();
	const collectedPayments: RoundedPayments = roundPayments(
		totalPrice,
		payments
	);
	collectedPayments.payments.forEach(payment =>
		collectedPaymentsMap.set(payment.person, payment.amount / 100)
	);

	const onPersonSelect = (person: ColourCodedPerson) => {
		setSelectedName(person.getName());
		setShowModal(false);
	};

	const onPaymentAdd = () => {
		const newPayments = payments.slice();
		const paymentIndex = newPayments.findIndex(
			payment => payment.person === selectedName
		);
		const payment: PaymentPercentage = {
			person: selectedName,
			percentage: parseFloat(value)
		};

		if (paymentIndex > -1) {
			payment.percentage += newPayments[paymentIndex].percentage;
			newPayments[paymentIndex] = payment;
		} else {
			newPayments.push(payment);
		}

		setPayments(newPayments);
	};

	const onPaymentDelete = (index: number) => {
		const newPayments = payments.slice();
		newPayments.splice(index, 1);
		console.log(index, payments, newPayments);
		setPayments(newPayments);
	};

	const onSubmit = () => {
		props.onSubmit({ payments: payments });
	};

	return (
		<Portal>
			{showModal && (
				<PickerModal
					onSelect={onPersonSelect}
					onDismiss={() => setShowModal(false)}
					people={props.people}
				/>
			)}

			<Modal
				visible={props.visible}
				onDismiss={props.onCancel}
				contentContainerStyle={{
					backgroundColor: "white",
					padding: 10,
					margin: 30,
					borderRadius: 10,
					height: "90%"
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
						marginBottom: 20
					}}
				>
					Manage Payments
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 4
					}}
				>
					<Button
						style={{
							borderRadius: 100,
							marginHorizontal: 6,
							borderWidth: 1
						}}
						mode={useQuantity ? "contained" : "outlined"}
						onPress={() => setUseQuantity(true)}
					>
						#
					</Button>

					<Button
						style={{
							borderRadius: 100,
							marginHorizontal: 6,
							borderWidth: 1
						}}
						mode={useQuantity ? "outlined" : "contained"}
						onPress={() => setUseQuantity(false)}
					>
						%
					</Button>
				</View>
				<Button
					mode="outlined"
					icon={"account"}
					onPress={() => setShowModal(true)}
					style={{
						marginVertical: 10,
						marginHorizontal: 20,
						borderWidth: 1
					}}
				>
					{selectedName || "Select Person"}
				</Button>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center"
					}}
				>
					<TextInput
						keyboardType={useQuantity ? "numeric" : "decimal-pad"}
						value={value}
						onChangeText={setValue}
						mode="outlined"
						style={{
							width: "60%",
							marginHorizontal: 10,
							fontSize: 20,
							paddingHorizontal: 3,
							textAlign: useQuantity ? "left" : "right"
						}}
						left={useQuantity && <TextInput.Affix text="#" />}
						right={!useQuantity && <TextInput.Affix text="%" />}
					/>
					<IconButton
						icon="plus"
						size={28}
						style={{
							alignSelf: "center",
							borderWidth: 1,
							borderColor: DefaultTheme.colors.backdrop
						}}
						onPress={onPaymentAdd}
					/>
				</View>
				<Divider style={{ margin: 10 }} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 10
					}}
				>
					<NumberBubble
						style={{ paddingHorizontal: 20, paddingTop: 12 }}
					>
						<RemainderDisplay
							total={totalPrice / 100}
							remainder={collectedPayments.remainder / 100}
							prepend="£"
						/>
					</NumberBubble>
					<NumberBubble size={22} style={{ paddingHorizontal: 20 }}>
						{collectedPayments.remainingPercentage.toFixed(2)}%
					</NumberBubble>
				</View>
				<ScrollView>
					<DataTable>
						{payments.map((payment, index) => (
							<>
								<DataTable.Row style={{ marginRight: 30 }}>
									<DataTable.Cell>
										{payment.person}
									</DataTable.Cell>
									<DataTable.Cell numeric>
										{payment.percentage}%
									</DataTable.Cell>
									<DataTable.Cell numeric>
										£
										{collectedPaymentsMap.get(
											payment.person
										)}
									</DataTable.Cell>
									<IconButton
										size={22}
										style={{
											position: "absolute",
											right: -50
										}}
										icon="delete"
										onPress={() => onPaymentDelete(index)}
									/>
								</DataTable.Row>
							</>
						))}
					</DataTable>
				</ScrollView>
				<Button
					mode="contained"
					onPress={onSubmit}
					style={{
						margin: 10,
						marginHorizontal: 50,
						marginBottom: 30
					}}
				>
					save
				</Button>
			</Modal>
		</Portal>
	);
}
