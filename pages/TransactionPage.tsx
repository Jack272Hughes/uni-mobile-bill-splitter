import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList, Screens } from "../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TransactionPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.TRANSACTION
>;

export default function TransactionPage(props: TransactionPageProps) {
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
					onPress={() => navigation.navigate(Screens.PAYMENT)}
				>
					Payment
				</Button>
			</View>
		</SafeAreaView>
	);
}
