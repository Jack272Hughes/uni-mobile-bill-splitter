import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList, Screens } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Transaction } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.PAYMENT
>;

export default function PaymentPage(props: PaymentPageProps) {
	const navigation = useNavigation<NavigationProp<any>>();
	const [transaction, setTransaction] = useState<Transaction>();

	useEffect(() => {
		AsyncStorage.getItem(props.route.params.transactionName)
			.then(result => setTransaction(JSON.parse(result || "{}")))
			.catch(console.error);
	}, []);

	return (
		<SafeAreaView style={{ padding: 25 }}>
			<Text>Payment Page</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: 10
				}}
			>
				<Button mode="contained" onPress={() => navigation.goBack()}>
					Home
				</Button>
				<Button
					mode="contained"
					onPress={() => navigation.navigate(Screens.TRANSACTION)}
				>
					Transaction
				</Button>
			</View>
		</SafeAreaView>
	);
}
