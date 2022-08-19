import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
	Button,
	Card,
	Divider,
	IconButton,
	Paragraph,
	Text,
	Title
} from "react-native-paper";
import { Screens } from "../components/Navigation";
import {
	ModalInfo,
	Transaction,
	TransactionDefinition,
	TransactionInfo
} from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalType, TransactionModal } from "../components/modals";
import processImage from "../utils/ImageParser";
import { TRANSACTION_STORAGE_KEY } from "./DisplayPage";

const NO_MODAL = { type: ModalType.NONE };

const HOME_STORAGE_KEY = "HOME";

export default function HomePage() {
	const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
	const [modal, setModal] = useState<ModalInfo>(NO_MODAL);
	const navigation = useNavigation<NavigationProp<any>>();

	useEffect(() => {
		AsyncStorage.getItem(`${HOME_STORAGE_KEY}-transactions`)
			.then(result => setTransactions(result ? JSON.parse(result) : []))
			.catch(console.error);
	}, []);

	const addTransaction = (transaction: TransactionDefinition) => {
		const newTransactions = transactions.slice();
		if (modal.dataName) {
			const existingTransaction = newTransactions.findIndex(
				transaction => transaction.name === modal.dataName
			);
			newTransactions[existingTransaction] = transaction;
		} else {
			newTransactions.push(transaction);
		}

		AsyncStorage.setItem(
			`${HOME_STORAGE_KEY}-transactions`,
			JSON.stringify(newTransactions)
		)
			.then(async () => {
				if (transaction.imageUri) {
					await processImage(transaction.imageUri)
						.then(async items => {
							await AsyncStorage.setItem(
								`${TRANSACTION_STORAGE_KEY}-${transaction.name}`,
								JSON.stringify({ people: [], items })
							);
						})
						.catch(err => console.error(err));
				}
				setTransactions(newTransactions);
			})
			.catch(err => console.error(err))
			.finally(() => setModal(NO_MODAL));
	};

	const removeTransaction = (transaction: TransactionInfo) => {
		const newTransactions = transactions.slice();
		const index = newTransactions.findIndex(t => t === transaction);

		if (index > -1) {
			newTransactions.splice(index, 1);
			AsyncStorage.removeItem(
				`${TRANSACTION_STORAGE_KEY}-${transaction.name}`
			);
			setTransactions(newTransactions);
		}
	};

	return (
		<SafeAreaView style={{ padding: 25, marginBottom: 75 }}>
			{modal.type === ModalType.TRANSACTION && (
				<TransactionModal
					transaction={
						modal.dataName
							? transactions.find(
									transaction =>
										transaction.name === modal.dataName
							  )
							: undefined
					}
					onSubmit={transactionDefinition =>
						addTransaction(transactionDefinition)
					}
					onDismiss={() => setModal(NO_MODAL)}
				/>
			)}
			<Text style={{ fontSize: 32, textAlign: "center" }}>
				Bill Splitter
			</Text>
			<Button
				mode="contained"
				style={{ margin: 20 }}
				onPress={() => setModal({ type: ModalType.TRANSACTION })}
			>
				New Transaction
			</Button>
			<ScrollView showsVerticalScrollIndicator={false}>
				{transactions.map((transaction, index) => {
					return (
						<Card
							key={index}
							style={{ margin: 5 }}
							onPress={() => {
								navigation.navigate(Screens.PAYMENT, {
									transactionName: transaction.name
								});
							}}
							onLongPress={() => {
								setModal({
									type: ModalType.TRANSACTION,
									dataName: transaction.name
								});
							}}
						>
							<IconButton
								icon="close"
								style={{
									position: "absolute",
									right: 0,
									zIndex: 1
								}}
								onPress={() => removeTransaction(transaction)}
							/>
							<Card.Content style={{ padding: 16 }}>
								<Paragraph>{transaction.date}</Paragraph>
								<Divider />
								<Title>{transaction.name}</Title>
							</Card.Content>
						</Card>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}
