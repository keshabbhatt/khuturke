import {
	Card,
	CardHeader,
	CardBody,
	IconButton,
	Flex,
	Box,
	Switch,
	Stat,
	StatLabel,
	StatNumber,
	Heading,
} from "@chakra-ui/react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";

export function BudgetCard({ budget, onActivate, onDelete, onEdit }) {
	return (
		<Card borderRadius={10}>
			<CardHeader>
				<Flex justifyContent="space-between" alignItems="center">
					<Box>
						<Heading size="lg">{budget.name}</Heading>
					</Box>
					<Box>
						<Switch
							isChecked={budget.isActive ?? false}
							onChange={() => onActivate(budget.id)}
						/>
					</Box>
				</Flex>
			</CardHeader>
			<CardBody>
				<Flex>
					<Stat>
						<StatLabel>Income</StatLabel>
						<StatNumber>RS {budget.income}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Expense</StatLabel>
						<StatNumber>RS {budget.expense}</StatNumber>
					</Stat>
				</Flex>
				<Flex justifyContent="end" alignItems="center" mt={4}>
					<IconButton
						variant="ghost"
						icon={<FiEdit />}
						onClick={() => onEdit(budget.id)}
					/>
					<IconButton
						variant="ghost"
						icon={<FiTrash2 />}
						onClick={() => onDelete(budget.id)}
					/>
				</Flex>
			</CardBody>
		</Card>
	);
}

BudgetCard.propTypes = {
	budget: PropTypes.object.isRequired,
	onActivate: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};
