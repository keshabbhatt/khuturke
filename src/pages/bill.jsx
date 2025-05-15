import { Box, Heading, Text, Button, Input, VStack, List, ListItem, Checkbox, Divider } from "@chakra-ui/react";
import { useState } from "react";

export const BillsReminder = () => {
  const [billName, setBillName] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [bills, setBills] = useState([]);

  const handleAddBill = () => {
    if (billName && billAmount > 0 && dueDate) {
      setBills([ ...bills, { id: Date.now(), name: billName, amount: billAmount, dueDate, paid: false } ]);
      setBillName("");
      setBillAmount("");
      setDueDate("");
    } else {
      alert("Please enter valid bill details.");
    }
  };

  const togglePaidStatus = (id) => {
    setBills(
      bills.map((bill) =>
        bill.id === id ? { ...bill, paid: !bill.paid } : bill
      )
    );
  };

  const handleDeleteBill = (id) => {
    setBills(bills.filter((bill) => bill.id !== id));
  };

  return (
    <Box p={6} maxW="lg" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading mb={4}>Bills Reminder</Heading>
      <VStack spacing={4} align="stretch">
        <Text>Bill Name</Text>
        <Input
          placeholder="E.g., Electricity, Internet"
          value={billName}
          onChange={(e) => setBillName(e.target.value)}
        />

        <Text>Bill Amount</Text>
        <Input
          type="number"
          placeholder="E.g., 1500"
          value={billAmount}
          onChange={(e) => setBillAmount(Number(e.target.value))}
        />

        <Text>Due Date</Text>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <Button colorScheme="blue" onClick={handleAddBill}>
          Add Bill
        </Button>
      </VStack>

      <Box mt={8}>
        <Heading size="md" mb={4}>Your Bills</Heading>
        {bills.length === 0 ? (
          <Text>No bills added yet. Start by adding a bill above!</Text>
        ) : (
          <List spacing={3}>
            {bills.map((bill) => (
              <ListItem key={bill.id} borderWidth={1} borderRadius="md" p={4} boxShadow="sm">
                <Checkbox
                  isChecked={bill.paid}
                  onChange={() => togglePaidStatus(bill.id)}
                  colorScheme="green"
                >
                  <Text as={bill.paid ? "del" : "span"} fontWeight="bold">
                    {bill.name}
                  </Text>
                </Checkbox>
                <Text>Amount: Rs. {bill.amount}</Text>
                <Text>Due Date: {bill.dueDate}</Text>
                <Button mt={2} colorScheme="red" size="sm" onClick={() => handleDeleteBill(bill.id)}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};
