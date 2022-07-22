import React from "react";
import { Text, View } from "react-native";
import { Button, IconButton, TouchableRipple } from "react-native-paper";
import { RootStackParamList, Screens } from "../components/Navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TransactionPageProps = NativeStackScreenProps<
	RootStackParamList,
	Screens.TRANSACTION
>;

export default function TransactionPage(props: TransactionPageProps) {
	const navigation = useNavigation<NavigationProp<any>>();

	const { transactionName } = props.route.params;

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
		</SafeAreaView>
	);
}
