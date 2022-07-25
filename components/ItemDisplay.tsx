import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Badge, Card, DefaultTheme, Surface, Text } from "react-native-paper";
import { Item } from "../types";
import { ColourCodedPerson } from "../utils/StringToColourHex";

type ItemProps = {
	item: Item;
	people: ColourCodedPerson[];
	onPress?: () => void;
	onLongPress?: () => void;
};

const priceStyleWithRemainder: TextStyle = {
	fontSize: 16,
	textDecorationLine: "line-through",
	color: DefaultTheme.colors.backdrop
};

const normalPriceStyle: TextStyle = {
	fontSize: 24,
	textDecorationLine: "none",
	color: DefaultTheme.colors.text
};

export default function ItemDisplay({
	item,
	people,
	onPress,
	onLongPress
}: ItemProps) {
	const totalPrice = (item.price * item.quantity) / 100;
	const totalPercentage =
		item.payments.reduce((acc, payment) => (acc += payment.percentage), 0) /
		100;
	const remainder = totalPrice - totalPercentage * totalPrice;

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
					{item.quantity}
				</Badge>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ fontSize: 24, flexShrink: 1 }}>
						{item.name}
					</Text>
					<View style={{ flexDirection: "row", alignSelf: "center" }}>
						<Text
							style={
								remainder !== totalPrice
									? priceStyleWithRemainder
									: normalPriceStyle
							}
						>
							£{totalPrice}
						</Text>
						{remainder !== totalPrice && (
							<Text style={{ fontSize: 24, marginLeft: 10 }}>
								£{remainder}
							</Text>
						)}
					</View>
				</View>
			</Card>
			{item.payments.length > 0 && (
				<View
					style={{
						flexDirection: "row",
						zIndex: -1,
						position: "relative",
						top: -9
					}}
				>
					{item.payments.map((payment, index) => {
						const backgroundColor = people
							.find(person => person.getName() === payment.person)
							?.getHexColour();

						if (!backgroundColor) return <></>;
						else
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
					})}
				</View>
			)}
		</View>
	);
}
