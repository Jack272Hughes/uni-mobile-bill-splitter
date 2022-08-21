import React, { useState } from "react";
import { View } from "react-native";
import {
	Asset,
	CameraOptions,
	ImageLibraryOptions,
	launchCamera,
	launchImageLibrary
} from "react-native-image-picker";
import {
	ActivityIndicator,
	Button,
	DefaultTheme,
	IconButton,
	Modal,
	Portal,
	Text,
	TextInput
} from "react-native-paper";
import { TransactionDefinition, TransactionInfo } from "../../types";
import DatePickerModal from "./DatePickerModal";

type TransactionModalProps = {
	transaction?: TransactionInfo;
	onSubmit: (transactionDefinition: TransactionDefinition) => void;
	onDismiss: () => void;
};

const imageLibraryOptions: ImageLibraryOptions = {
	mediaType: "photo"
};

const cameraOptions: CameraOptions = {
	mediaType: "photo",
	cameraType: "back"
};

export default function TransactionModal(props: TransactionModalProps) {
	const [showModal, setShowModal] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);

	const [name, setName] = useState(props.transaction?.name || "");
	const [date, setDate] = useState(
		props.transaction?.date || new Date().toLocaleDateString("en-GB")
	);
	const [asset, setAsset] = useState<Asset>();

	const selectFile = () => {
		launchImageLibrary(imageLibraryOptions).then(response => {
			if (response.assets && response.assets.length > 0) {
				setAsset(response.assets[0]);
			}
		});
	};

	const takePhoto = () => {
		launchCamera(cameraOptions).then(response => {
			if (response.assets && response.assets.length > 0) {
				setAsset(response.assets[0]);
			}
		});
	};

	const createTransaction = () => {
		setShowSpinner(true);
		if (name.length > 0 && date.length > 0) {
			props.onSubmit({ name, date, imageUri: asset?.uri });
		}
	};

	return (
		<Portal>
			{showModal && (
				<DatePickerModal
					date={date}
					onSave={date => {
						setDate(date);
						setShowModal(false);
					}}
					onDismiss={() => setShowModal(false)}
				/>
			)}
			<Modal
				visible
				onDismiss={props.onDismiss}
				contentContainerStyle={{
					backgroundColor: "white",
					padding: 20,
					margin: 30,
					marginVertical: 100,
					borderRadius: 10
				}}
			>
				<IconButton
					size={32}
					icon="close"
					onPress={props.onDismiss}
					style={{ alignSelf: "flex-end", margin: 0 }}
				/>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center",
						marginBottom: 10
					}}
				>
					{props.transaction ? "Edit" : "Add"} Transaction
				</Text>
				<TextInput
					style={{ marginHorizontal: 20, marginVertical: 5 }}
					mode="outlined"
					label="Transaction Name"
					value={name}
					onChangeText={setName}
					returnKeyType="done"
				/>
				<Button
					style={{
						marginHorizontal: 20,
						marginVertical: 5,
						borderWidth: 1,
						borderColor: DefaultTheme.colors.backdrop
					}}
					mode="outlined"
					onPress={() => setShowModal(true)}
				>
					{date}
				</Button>
				{!props.transaction && (
					<>
						<View
							style={{
								flexDirection: "row",
								marginHorizontal: 20,
								marginVertical: 5,
								justifyContent: "space-around"
							}}
						>
							<Button mode="contained" onPress={selectFile}>
								Image
							</Button>
							<Button mode="contained" onPress={takePhoto}>
								Camera
							</Button>
						</View>
						{asset && (
							<View
								style={{
									flexDirection: "row",
									marginHorizontal: 20,
									marginVertical: 5,
									alignItems: "center",
									borderWidth: 1,
									borderRadius: 10,
									borderColor: DefaultTheme.colors.backdrop,
									flexWrap: "wrap"
								}}
							>
								<IconButton
									icon="delete"
									onPress={() => setAsset(undefined)}
								/>
								<Text style={{ textAlignVertical: "center" }}>
									{asset.fileName}
								</Text>
							</View>
						)}
					</>
				)}
				<Button
					mode="contained"
					onPress={() => createTransaction()}
					style={{
						margin: 10,
						marginHorizontal: 50,
						marginBottom: 20
					}}
				>
					{props.transaction ? "Update" : "Create"}
				</Button>
				{showSpinner && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<ActivityIndicator animating={true} />
						<Text style={{ marginLeft: 10, fontSize: 16 }}>
							Processing Image
						</Text>
					</View>
				)}
			</Modal>
		</Portal>
	);
}
