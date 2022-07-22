import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import PaymentPage from "./pages/PaymentPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Transaction } from "./types";

export enum Screens {
	HOME = "home",
	PAYMENT = "payment",
	TRANSACTION = "transaction"
}

export type RootStackParamList = {
	[Screens.HOME]: undefined;
	[Screens.PAYMENT]: { transactionName: string };
	[Screens.TRANSACTION]: { transaction: Transaction };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name={Screens.HOME} component={HomePage} />
					<Stack.Screen
						name={Screens.PAYMENT}
						component={PaymentPage}
					/>
					<Stack.Screen
						name={Screens.TRANSACTION}
						options={{ animation: "slide_from_bottom" }}
						component={TransactionPage}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
