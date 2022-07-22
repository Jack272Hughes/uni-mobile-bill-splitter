import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { screens } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionPage() {
	const navigation = useNavigation<NavigationProp<any>>();

	return (
		<SafeAreaView style={{ padding: 25, marginBottom: 75 }}>
			<Text>Transaction Page</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: 10
				}}
			>
				<Button
					mode="contained"
					onPress={() => navigation.navigate(screens.PAYMENT)}
				>
					Payment
				</Button>
			</View>
		</SafeAreaView>
	);
}
