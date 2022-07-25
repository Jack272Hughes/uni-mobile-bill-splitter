import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Divider, IconButton, Surface } from "react-native-paper";
import { RootStackParamList, Screens } from "../components/Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Item, Transaction } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColourCodedPerson } from "../utils/StringToColourHex";
import PersonIcon from "../components/PersonIcon";

type TransactionPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.TRANSACTION
>;

export function createBlankTransaction(): Transaction {
	return { people: [], items: [] };
}

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
	people: ["Jayden-Lee West", "Jack Hughes", "Maria Sherbert"],
	items: [fakeItem]
};

export default function TransactionPage(props: TransactionPageProps) {
	const navigation = useNavigation<NavigationProp<any>>();
	const [selectedPerson, setSelectedPerson] = useState("");
	const [transaction, setTransaction] = useState<Transaction>(
		createBlankTransaction()
	);

	const { transactionName } = props.route.params;

	useEffect(() => {
		AsyncStorage.getItem(transactionName)
			// .then(result => setTransaction(JSON.parse(result || "{}")))
			.then(() => setTransaction(fakeTransaction))
			.catch(console.error);
	}, [props.route.params]);

	const people: ColourCodedPerson[] = transaction.people.map(
		person => new ColourCodedPerson(person)
	);

	function selectPerson(name: string): void {
		if (selectedPerson === name) setSelectedPerson("");
		else setSelectedPerson(name);
	}

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
					icon="undo"
					onPress={() => navigation.goBack()}
				/>
				<IconButton
					size={32}
					icon="check"
					onPress={() =>
						navigation.navigate(Screens.PAYMENT, {
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
			<Surface style={{ marginHorizontal: 20, marginVertical: 10 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						margin: 5
					}}
				>
					<Icon name="account-group" size={32} />
					<Text style={{ fontSize: 20, marginLeft: 10 }}>Payees</Text>
				</View>
				<Divider />
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
						margin: 10
					}}
				>
					{people.map((person, index) => {
						return (
							<PersonIcon
								key={index}
								person={person}
								isSelected={selectedPerson === person.getName()}
								onPress={() => selectPerson(person.getName())}
							/>
						);
					})}
				</View>
			</Surface>
		</SafeAreaView>
	);
}
