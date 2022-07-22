import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import Navigation from "./components/Navigation";

export default function App() {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<Navigation />
			</SafeAreaProvider>
		</PaperProvider>
	);
}
