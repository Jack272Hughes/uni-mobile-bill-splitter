import React from "react";
import { ViewStyle } from "react-native";
import { Surface, Text } from "react-native-paper";

type BubbleProps = {
	children: React.ReactNode;
	header?: string;
	prepend?: string;
	append?: string;
	style?: ViewStyle;
	size?: number;
};

export default function NumberBubble(props: BubbleProps) {
	return (
		<Surface
			style={{
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 5,
				paddingHorizontal: 35,
				borderRadius: 100,
				marginHorizontal: 10,
				...props.style
			}}
		>
			{props.header && (
				<Text style={{ fontSize: props.size ? props.size * 1.25 : 20 }}>
					{props.header}
				</Text>
			)}
			<Text style={{ fontSize: props.size || 16 }}>
				{props.prepend}
				{props.children}
				{props.append}
			</Text>
		</Surface>
	);
}
