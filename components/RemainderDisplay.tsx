import React from "react";
import { TextStyle, View } from "react-native";
import { DefaultTheme, Text } from "react-native-paper";

type PriceRemainderProps = {
	total: number;
	remainder: number;
	size?: number;
	prepend?: string;
	append?: string;
};

export default function RemainderDisplay({
	total,
	remainder,
	size = 24,
	prepend = "",
	append = ""
}: PriceRemainderProps) {
	const priceStyleWithRemainder: TextStyle = {
		fontSize: size * 0.66,
		textDecorationLine: "line-through",
		color: DefaultTheme.colors.backdrop,
		textAlignVertical: "center",
		textAlign: "center"
	};

	const normalPriceStyle: TextStyle = {
		fontSize: size,
		textDecorationLine: "none",
		color: DefaultTheme.colors.text,
		textAlignVertical: "center",
		textAlign: "center"
	};

	return (
		<View
			style={{
				flexDirection: "row",
				alignSelf: "center",
				justifyContent: "center"
			}}
		>
			<Text
				style={
					remainder !== total
						? priceStyleWithRemainder
						: normalPriceStyle
				}
			>
				{prepend + total.toFixed(2) + append}
			</Text>
			{remainder !== total && (
				<Text style={{ fontSize: size, marginLeft: 10 }}>
					{prepend + remainder.toFixed(2) + append}
				</Text>
			)}
		</View>
	);
}
