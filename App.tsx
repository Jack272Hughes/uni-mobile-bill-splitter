import React from "react";
import { SafeAreaView, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import PaymentPage from "./pages/PaymentPage";

const Stack = createNativeStackNavigator();

export const screens = {
	HOME: "home",
	TRANSACTION: "transaction",
	PAYMENT: "payment"
};

export default function App() {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={screens.HOME}
					component={HomePage}
					options={{ title: "Bill Splitter" }}
				/>
				<Stack.Screen
					name={screens.TRANSACTION}
					options={{ title: "Transaction" }}
					component={TransactionPage}
				/>
				<Stack.Screen
					name={screens.PAYMENT}
					options={{ title: "" }}
					component={PaymentPage}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
