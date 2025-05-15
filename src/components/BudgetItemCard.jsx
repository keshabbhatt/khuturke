import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Progress,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";

export function BudgetItemCard({ budgetItem, handleEdit, handleDelete }) {
  console.log(
    budgetItem?.expand?.transactions.reduce((sum, t) => sum + t.amount, 0)
  );
  const percentSpent = Math.floor(
    ((budgetItem?.expand?.transactions.reduce((sum, t) => sum + t.amount, 0) ??
      0) /
      budgetItem.allocated) *
      100
  );
  return (
    <Card minW={"35vw"} maxW={"35vw"}>
      <CardHeader>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              p={2}
              bgColor={budgetItem.bgColor}
              borderRadius={"25px"}
            >
              <Emoji unified={budgetItem.emoji} emojiStyle="native" />
            </Flex>
            <Text fontSize="xl" ml={4}>
              {budgetItem.name}
            </Text>
          </Flex>

          <Box>
            <IconButton
              icon={<FiEdit />}
              variant="ghost"
              onClick={() => handleEdit(budgetItem)}
            ></IconButton>
            <IconButton
              icon={<FiTrash2 />}
              variant="ghost"
              onClick={() => handleDelete(budgetItem.id)}
            ></IconButton>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Progress value={percentSpent} variant={"inline"} />
        <Flex mt={4} justifyContent={"space-between"}>
          <Text>
            RS
            {budgetItem.transactions.length !== 0
              ? budgetItem.expand.transactions.reduce(
                  (sum, t) => sum + t.amount,
                  0
                )
              : 0}
            / RS{budgetItem.allocated}
          </Text>
          <Text float={"right"}>{percentSpent}%</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

BudgetItemCard.propTypes = {
  budgetItem: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};
