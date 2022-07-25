import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import Navigation from "./components/Navigation";

export default function App() {
	return (
		<PaperProvider>
			<SafeAreaProvider>
				<Navigation />
			</SafeAreaProvider>
		</PaperProvider>
	);
}
