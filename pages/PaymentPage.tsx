import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { screens } from "../App";
import { NavigationProp } from "@react-navigation/native";

type PaymentPageProps = {
	navigation: NavigationProp<any>;
};

export default function PaymentPage(props: PaymentPageProps) {
	const navigate = (screen: string) => {
		props.navigation.reset({
			index: 0,
			routes: [{ name: screen }]
		});
	};

	return (
		<View style={{ padding: 25 }}>
			<Text>Payment Page</Text>
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
					onPress={() => navigate(screens.TRANSACTION)}
				>
					Transaction
				</Button>
			</View>
		</View>
	);
}
