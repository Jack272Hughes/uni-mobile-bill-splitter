import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { RootStackParamList, Screens } from "../components/Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Item, Transaction } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.PAYMENT
>;

const fakeItem: Item = {
	name: "Coca-cola",
	quantity: 3,
	price: 299,
	payments: [
		{
			person: "Jack Hughes",
			percentage: 33.33
		},
		{
			person: "Maria Sherbert",
			percentage: 67.67
		}
	]
};

const fakeTransaction: Transaction = {
	people: ["Simon West", "Jack Hughes", "Maria Sherbert"],
	items: [fakeItem]
};

export default function PaymentPage(props: PaymentPageProps) {
	const navigation = useNavigation<NavigationProp<any>>();
	const [transaction, setTransaction] = useState<Transaction>();

	const { transactionName } = props.route.params;

	useEffect(() => {
		AsyncStorage.getItem(transactionName)
			// .then(result => setTransaction(JSON.parse(result || "{}")))
			.then(() => setTransaction(fakeTransaction))
			.catch(console.error);
	}, [props.route.params]);

	const payments = [];

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
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: 10
				}}
			></View>
		</SafeAreaView>
	);
}
