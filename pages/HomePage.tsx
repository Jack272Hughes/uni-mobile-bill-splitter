import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
	Button,
	Card,
	Divider,
	Paragraph,
	Text,
	Title
} from "react-native-paper";
import { screens } from "../App";
import { Transaction } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const navigation = useNavigation<NavigationProp<any>>();

	useEffect(() => {
		AsyncStorage.getItem("transactions")
			// .then(result => setTransactions(JSON.parse(result || "[]")))
			.then(() =>
				setTransactions(
					new Array(20).fill({
						name: "Holiday to United States of America",
						date: "27/05/2021"
					})
				)
			)
			.catch(console.error);
	}, []);

	return (
		<SafeAreaView style={{ padding: 25, marginBottom: 75 }}>
			<Text style={{ fontSize: 32, textAlign: "center" }}>
				Bill Splitter
			</Text>
			<Button mode="contained" style={{ margin: 20 }}>
				New Transaction
			</Button>
			<ScrollView showsVerticalScrollIndicator={false}>
				{transactions.map((transaction, index) => {
					return (
						<Card
							key={index}
							style={{ margin: 5 }}
							onPress={() => {
								navigation.navigate(screens.PAYMENT);
							}}
						>
							<Card.Content>
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
