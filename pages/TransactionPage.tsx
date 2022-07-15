import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { screens } from "../App";
import { NavigationProp } from "@react-navigation/native";

type TransactionPageProps = {
	navigation: NavigationProp<any>;
};

export default function TransactionPage(props: TransactionPageProps) {
	const navigate = (screen: string) => {
		props.navigation.reset({
			index: 0,
			routes: [{ name: screen }]
		});
	};

	return (
		<View style={{ padding: 25 }}>
			<Text>Transaction Page</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: 10
				}}
			>
				<Button mode="contained" onPress={() => navigate(screens.HOME)}>
					Home
				</Button>
				<Button
					mode="contained"
					onPress={() => navigate(screens.PAYMENT)}
				>
					Payment
				</Button>
			</View>
		</View>
	);
}
