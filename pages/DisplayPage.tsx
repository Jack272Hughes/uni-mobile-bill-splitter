import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import { RootStackParamList, Screens } from "../components/Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Transaction } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBlankTransaction } from "./EditPage";
import collectPayments from "../utils/CollectPayments";
import NumberBubble from "../components/NumberBubble";
import PaymentDisplay from "../components/PaymentDisplay";

type PaymentPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.PAYMENT
>;

const EMPTY_TRANSACTION: Transaction = createBlankTransaction();

export const TRANSACTION_STORAGE_KEY = "TRANSACTION";

export default function DisplayPage(props: PaymentPageProps) {
	const navigation = useNavigation<NavigationProp<any>>();
	const [transaction, setTransaction] =
		useState<Transaction>(EMPTY_TRANSACTION);

	const { transactionName } = props.route.params;

	useEffect(() => {
		AsyncStorage.getItem(`${TRANSACTION_STORAGE_KEY}-${transactionName}`)
			.then(result =>
				setTransaction(result ? JSON.parse(result) : EMPTY_TRANSACTION)
			)
			.catch(console.error);
	}, [props.route.params]);

	const collectedPayments = collectPayments(transaction);

	return (
		<SafeAreaView style={{ padding: 5 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between"
				}}
			>
				<IconButton
					size={32}
					icon="arrow-left"
					onPress={() => navigation.goBack()}
				/>
				<IconButton
					size={32}
					icon="pencil-outline"
					onPress={() =>
						navigation.navigate(Screens.TRANSACTION, {
							transactionName
						})
					}
				/>
			</View>
			<Text
				style={{
					fontSize: 24,
					textAlign: "center",
					paddingHorizontal: 25,
					paddingVertical: 5
				}}
			>
				{transactionName}
			</Text>
			<Divider style={{ margin: 15 }} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginBottom: 15
				}}
			>
				<NumberBubble prepend="£" header="Bill Total">
					{(collectedPayments.total / 100).toFixed(2)}
				</NumberBubble>
				<NumberBubble prepend="£" header="Unpaid">
					{(collectedPayments.remainder / 100).toFixed(2)}
				</NumberBubble>
			</View>
			<PaymentDisplay collectedPayments={collectedPayments} />
		</SafeAreaView>
	);
}
