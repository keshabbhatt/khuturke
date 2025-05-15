import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { TransactionGroupCard } from "./TransactionGroupCard";
import { groupBy } from "../utils";

export function TransactionList({ transactions, groupByValue }) {
	const noTransactionBannerBgColor = useColorModeValue("gray.200", "gray.700");
	const transactionsByDate = transactions
		? groupBy(transactions, groupByValue)
		: [];
	return (
		<Box>
			{transactions.length === 0 && (
				<Box
					textAlign="center"
					py={4}
					bgColor={noTransactionBannerBgColor}
					borderRadius="md"
				>
					<Text>No Transactions found</Text>
				</Box>
			)}
			{transactionsByDate &&
				Object.keys(transactionsByDate).map((group) => (
					<TransactionGroupCard
						transactionsByDate={transactionsByDate[group]}
						isDate={groupByValue === "date"}
						group={group}
						key={group}
					/>
				))}
		</Box>
	);
}
