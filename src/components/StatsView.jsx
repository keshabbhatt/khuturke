import {
	Card,
	CardBody,
	Flex,
	Divider,
	Box,
	Stat,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";

export function StatsView({ income, expense, isBudget }) {
	return (
		<Card my={4}>
			<CardBody>
				<Flex direction="row" justifyContent="space-evenly">
					<Box>
						<Stat>
							<StatLabel>Income</StatLabel>
							<StatNumber>{income}</StatNumber>
						</Stat>
					</Box>
					<Box>
						<Divider orientation="vertical" />
					</Box>
					<Box>
						<Stat>
							<StatLabel>Expense</StatLabel>
							<StatNumber> {expense}</StatNumber>
						</Stat>
					</Box>
					{!isBudget && (
						<>
							<Box>
								<Divider orientation="vertical" />
							</Box>
							<Box>
								<Stat>
									<StatLabel>Balance</StatLabel>
									<StatNumber>RS {income - expense}</StatNumber>
								</Stat>
							</Box>
						</>
					)}
				</Flex>
			</CardBody>
		</Card>
	);
}
