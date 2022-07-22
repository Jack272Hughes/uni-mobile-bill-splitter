import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { screens } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentPage() {
	const navigation = useNavigation<NavigationProp<any>>();

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
					onPress={() => navigation.navigate(screens.TRANSACTION)}
				>
					Transaction
				</Button>
			</View>
		</SafeAreaView>
	);
}
