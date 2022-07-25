import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { CollectedPayments } from "../types";

type DisplayProps = {
	collectedPayments: CollectedPayments;
};

type TotalPayment = [string, number];

const calculateTotalPayments = (
	collectedPayments: CollectedPayments
): TotalPayment[] => {
	let totalPayments: TotalPayment[] = [];

	collectedPayments.payments.forEach((payments, name) => {
		totalPayments.push([
			name,
			payments.reduce((acc, p) => (acc += p.amount), 0)
		]);
	});

	return totalPayments;
};

export default function PaymentDisplay(props: DisplayProps) {
	const [selectedPerson, setSelectedPerson] = useState("");
	const totalPayments: TotalPayment[] = useMemo(
		() => calculateTotalPayments(props.collectedPayments),
		[props.collectedPayments]
	);

	const selectPerson = (name: string) => {
		if (selectedPerson === name) setSelectedPerson("");
		else setSelectedPerson(name);
	};

	return (
		<View style={{ marginHorizontal: 10 }}>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title textStyle={{ fontSize: 20 }}>
						Person
					</DataTable.Title>
					<DataTable.Title textStyle={{ fontSize: 20 }}>
						Total
					</DataTable.Title>
				</DataTable.Header>

				<ScrollView style={{ marginBottom: 585 }}>
					{totalPayments.map(([name, totalPayment], index) => {
						return (
							<>
								<DataTable.Row
									key={index}
									onPress={() => selectPerson(name)}
								>
									<DataTable.Cell
										textStyle={{ fontSize: 16 }}
									>
										{name}
									</DataTable.Cell>
									<DataTable.Cell
										textStyle={{ fontSize: 16 }}
									>
										£{totalPayment / 100}
									</DataTable.Cell>
								</DataTable.Row>

								{selectedPerson === name && totalPayment > 0 && (
									<DataTable>
										{props.collectedPayments.payments
											.get(name)
											?.map((itemPayment, itemIndex) => {
												return (
													<DataTable.Row
														key={itemIndex}
														style={{
															marginHorizontal: 20,
															paddingVertical: 0
														}}
													>
														<DataTable.Cell
															textStyle={{
																fontSize: 13
															}}
														>
															{itemPayment.item}
														</DataTable.Cell>
														<DataTable.Cell
															textStyle={{
																fontSize: 13
															}}
														>
															£
															{itemPayment.amount /
																100}
														</DataTable.Cell>
													</DataTable.Row>
												);
											})}
									</DataTable>
								)}
							</>
						);
					})}
				</ScrollView>
			</DataTable>
		</View>
	);
}
