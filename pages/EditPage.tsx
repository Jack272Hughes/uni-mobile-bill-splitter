import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Divider, IconButton, Surface } from "react-native-paper";
import { RootStackParamList, Screens } from "../components/Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Item, Transaction } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColourCodedPerson } from "../utils/ColourCodedPerson";
import PersonIcon from "../components/PersonIcon";
import { ItemModal, ModalType, PayeeModal } from "../components/modals";
import ItemDisplay from "../components/ItemDisplay";
import { ItemModalData } from "../components/modals/ItemModal";
import ComputedItem from "../utils/ComputedItem";

type TransactionPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.TRANSACTION
>;

type ModalInfo = {
	type: ModalType;
	dataName?: string;
};

const NO_MODAL = { type: ModalType.NONE };

function itemsMatch(item1: Item, item2: Item): boolean {
	return (
		item1.name === item2.name &&
		item1.price === item2.price &&
		item1.quantity === item2.quantity
	);
}

export function createBlankTransaction(): Transaction {
	return { people: [], items: [] };
}

const fakeItem: Item = {
	name: "Coca-cola",
	quantity: 4,
	price: 299,
	payments: [
		{
			people: ["Jack Hughes"],
			quantity: 1
		},
		{
			people: ["Maria Sherbert"],
			quantity: 1
		},
		{
			people: ["Jack Hughes", "Jayden-Lee West"],
			quantity: 1
		}
	]
};

const fakeTransaction: Transaction = {
	people: ["Jayden-Lee West", "Jack Hughes", "Maria Sherbert"],
	items: [fakeItem]
};

export default function EditPage(props: TransactionPageProps) {
	const { transactionName } = props.route.params;
	const navigation = useNavigation<NavigationProp<any>>();

	const [selectedPeople, setSelectedPeople] = useState<Set<string>>(
		new Set()
	);
	const [transaction, setTransaction] = useState(createBlankTransaction());
	const [currentModal, setCurrentModal] = useState<ModalInfo>(NO_MODAL);

	const closeModal = () => setCurrentModal(NO_MODAL);

	useEffect(() => {
		AsyncStorage.getItem(transactionName)
			// .then(result => setTransaction(JSON.parse(result || "{}")))
			.then(() => setTransaction(fakeTransaction))
			.catch(console.error);
	}, [props.route.params]);

	const people: ColourCodedPerson[] = transaction.people.map(
		person => new ColourCodedPerson(person)
	);

	const items: ComputedItem[] = transaction.items.map(
		item => new ComputedItem(item)
	);

	const selectPerson = (name: string): void => {
		const newSelectedPeople = new Set(selectedPeople);
		if (newSelectedPeople.has(name)) {
			newSelectedPeople.delete(name);
		} else {
			newSelectedPeople.add(name);
		}
		setSelectedPeople(newSelectedPeople);
	};

	const addPerson = (name: string): void => {
		const people = transaction.people.slice();
		let items = transaction.items.slice();

		if (currentModal.dataName) {
			// No changes needed if the name hasn't changed
			if (name === currentModal.dataName) return closeModal();

			const existingPersonIndex = people.findIndex(
				person => person === currentModal.dataName
			);
			// If new name already exists, old name just needs to be deleted
			if (people.includes(name)) people.splice(existingPersonIndex, 1);
			else people[existingPersonIndex] = name;
			// Update selected person if necessary
			if (selectedPeople.has(currentModal.dataName)) {
				selectedPeople.delete(currentModal.dataName);
				selectedPeople.add(name);
			}
			// Update every item payment for this person
			items = items.map(item => {
				return {
					...item,
					payments: item.payments.map(payment => {
						const peopleIndex = payment.people.findIndex(
							person => person === currentModal.dataName
						);
						if (peopleIndex > -1) {
							const newPeople = payment.people.slice();
							newPeople[peopleIndex] = name;
							return { ...payment, people: newPeople };
						} else {
							return payment;
						}
					})
				};
			});
		} else if (!people.includes(name)) {
			people.push(name);
		}

		setTransaction({ people, items });
		closeModal();
	};

	const addItem = (data: ItemModalData) => {
		const items: Item[] = transaction.items.slice();
		const newItem: Item = { ...data, payments: [] };

		if (currentModal.dataName) {
			const existingItemIndex = items.findIndex(
				item => item.name === currentModal.dataName
			);

			// No changes needed if the item hasn't changed
			if (itemsMatch(items[existingItemIndex], newItem))
				return closeModal();

			items[existingItemIndex] = newItem;
		} else {
			items.push(newItem);
		}

		setTransaction({
			...transaction,
			items
		});
		closeModal();
	};

	const createModal = () => {
		switch (currentModal.type) {
			case ModalType.PAYEE:
				return (
					<PayeeModal
						visible
						onSubmit={data => addPerson(data.name)}
						onCancel={closeModal}
						payee={currentModal.dataName}
					/>
				);
			case ModalType.ITEM:
				return (
					<ItemModal
						visible
						onSubmit={addItem}
						onCancel={closeModal}
						item={transaction.items.find(
							item => item.name === currentModal.dataName
						)}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<SafeAreaView style={{ padding: 5 }}>
			{createModal()}
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
			<Surface
				style={{
					marginHorizontal: 20,
					marginVertical: 10,
					borderRadius: 10
				}}
			>
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
								isSelected={selectedPeople.has(
									person.getName()
								)}
								onPress={() => selectPerson(person.getName())}
								onLongPress={() =>
									setCurrentModal({
										type: ModalType.PAYEE,
										dataName: person.getName()
									})
								}
							/>
						);
					})}
					<IconButton
						size={24}
						icon="plus"
						style={{
							margin: 0,
							marginLeft: 4,
							alignSelf: "center"
						}}
						onPress={() =>
							setCurrentModal({ type: ModalType.PAYEE })
						}
					/>
				</View>
			</Surface>

			<Button
				mode="contained"
				style={{ marginVertical: 10, marginHorizontal: 20 }}
				onPress={() => setCurrentModal({ type: ModalType.ITEM })}
			>
				Add Item
			</Button>
			{items.map((computedItem, index) => {
				return (
					<ItemDisplay
						key={index}
						onPress={() =>
							setCurrentModal({
								type: ModalType.ITEM,
								dataName: computedItem.getItem().name
							})
						}
						people={people}
						computedItem={computedItem}
					/>
				);
			})}
		</SafeAreaView>
	);
}
