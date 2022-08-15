import React from "react";
import { View } from "react-native";
import { Badge, Card, DefaultTheme, Text } from "react-native-paper";
import { ColourCodedPerson } from "../utils/ColourCodedPerson";
import ComputedItem from "../utils/ComputedItem";
import RemainderDisplay from "./RemainderDisplay";

type ItemProps = {
	computedItem: ComputedItem;
	people: ColourCodedPerson[];
	onPress?: () => void;
	onLongPress?: () => void;
};

export default function ItemDisplay({
	computedItem,
	people,
	onPress,
	onLongPress
}: ItemProps) {
	const payees = new Set<string>();
	computedItem
		.getItem()
		.payments.forEach(payment =>
			payment.people.forEach(person => payees.add(person))
		);

	payees.delete("");

	return (
		<View style={{ marginVertical: 5, marginHorizontal: 20 }}>
			<Card
				style={{
					padding: 10,
					borderRadius: 10
				}}
				onPress={onPress}
				onLongPress={onLongPress}
			>
				<Badge
					style={{
						position: "absolute",
						left: -16,
						top: -16,
						backgroundColor: DefaultTheme.colors.backdrop
					}}
				>
					{computedItem.getItem().quantity}
				</Badge>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ fontSize: 24, flexShrink: 1 }}>
						{computedItem.getItem().name}
					</Text>
					<RemainderDisplay
						total={computedItem.getTotalPrice() / 100}
						remainder={computedItem.getRemainder() / 100}
						prepend="£"
					/>
				</View>
			</Card>
			{computedItem.getItem().payments.length > 0 && (
				<View
					style={{
						flexDirection: "row",
						zIndex: -1,
						position: "relative",
						top: -9
					}}
				>
					{Array.from(payees).map((payee, index) => {
						const backgroundColor = people
							.find(person => person.getName() === payee)
							?.getHexColour();

						if (backgroundColor)
							return (
								<Badge
									key={index}
									style={{
										paddingTop: 2,
										alignSelf: "flex-start",
										marginLeft: 5,
										backgroundColor
									}}
								>
									{" "}
								</Badge>
							);
						else return <></>;
					})}
				</View>
			)}
		</View>
	);
}
