import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import DisplayPage from "../pages/DisplayPage";
import EditPage from "../pages/EditPage";

export enum Screens {
	HOME = "home",
	PAYMENT = "payment",
	TRANSACTION = "transaction"
}

export type RootStackParamList = {
	[Screens.HOME]: undefined;
	[Screens.PAYMENT]: { transactionName: string };
	[Screens.TRANSACTION]: { transactionName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name={Screens.HOME} component={HomePage} />
				<Stack.Screen name={Screens.PAYMENT} component={DisplayPage} />
				<Stack.Screen
					name={Screens.TRANSACTION}
					options={{ animation: "slide_from_bottom" }}
					component={EditPage}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
