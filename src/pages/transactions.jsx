import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  useMediaQuery
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { getTransactionsByMonthYear } from "../db/transactions";
import { getTotalExpense, getTotalIncome } from "../utils";
import { StatsView } from "../components/statsView";
import { TransactionList } from "../components/TransactionList";
import { CreateTransaction } from "../components/CreateTransaction";
import { getMonth } from "../utils";
import { FiFilter } from "react-icons/fi";

// Format currency to RS without extra symbols
const formatCurrencyRS = (amount) => {
  const numberAmount = parseFloat(amount); // Ensure the amount is a number
  if (isNaN(numberAmount) || numberAmount === 0) {
    return "RS 0"; // Return "RS 0" for invalid or zero amounts
  }
  return `RS ${numberAmount.toLocaleString()}`; // Format with RS and commas
};

export function TransactionsPage() {
  const today = new Date();
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [groupBy, setGroupBy] = useState("Date");
  const [selectedMonth, setSelectedMonth] = useState(getMonth(today));

  const transactions = useLiveQuery(async () => {
    let [year, month] = selectedMonth.split("-");
    let transactions = await getTransactionsByMonthYear(month, year);

    setIncome(getTotalIncome(transactions)); // Update income
    setExpense(getTotalExpense(transactions)); // Update expense
    return transactions;
  }, [selectedMonth]);

  // Responsive design hook for handling mobile view
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box p={4}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="2rem"
        direction={isMobile ? "column" : "row"}
        gap={4}
      >
        <Heading size="lg">Transactions</Heading>
        <Box flex="1" textAlign={isMobile ? "center" : "right"}>
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            width={isMobile ? "100%" : "auto"}
            maxWidth="200px"
          />
        </Box>
      </Flex>

      {transactions && (
        <StatsView
          expense={formatCurrencyRS(expense)}  // Format Expense with RS symbol
          income={formatCurrencyRS(income)}    // Format Income with RS symbol
          isBudget={false}
        />
      )}

      <Flex justifyContent="space-between" alignItems="center" mb={4} direction={isMobile ? "column" : "row"} gap={4}>
        <Box flex="1">
          <CreateTransaction />
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button} leftIcon={<FiFilter />} width="auto">
              {groupBy}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setGroupBy("Date");
                }}
              >
                Date
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGroupBy("Category");
                }}
              >
                Category
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      {transactions && (
        <TransactionList
          transactions={transactions}
          groupByValue={groupBy.toLowerCase()}  // Pass groupBy as lowercased value
        />
      )}
    </Box>
  );
}
