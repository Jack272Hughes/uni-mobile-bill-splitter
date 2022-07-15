import React from "react";
import { Text, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { screens } from "../App";

type HomePageProps = {
	navigation: NavigationProp<any>;
};

export default function HomePage(props: HomePageProps) {
	const navigate = (screen: string) => {
		props.navigation.reset({
			index: 0,
			routes: [{ name: screen }]
		});
	};

	return (
		<View style={{ padding: 25 }}>
			<Text>Update title</Text>
			<Button
				mode="contained"
				uppercase={false}
				onPress={() =>
					props.navigation.setOptions({ title: "Changed!" })
				}
			>
				Update title
			</Button>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					margin: 10
				}}
			>
				<Button
					mode="contained"
					onPress={() => navigate(screens.TRANSACTION)}
				>
					Transaction
				</Button>
				<Button
					mode="contained"
					onPress={() => navigate(screens.PAYMENT)}
				>
					Payment
				</Button>
			</View>
		</View>
	);
}
