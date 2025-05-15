import { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Select,
	useToast,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { createTransaction } from "../db/transactions";

const categories = [
	"Miscellaneous",
	"Entertainment",
	"Food",
	"Transportation",
	"Healthcare",
	"Education",
];

export function CreateTransaction() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [name, setName] = useState("");
	const [type, setType] = useState("expense");
	const [category, setCategory] = useState(categories[0]);
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const toast = useToast();

	const handleCreateTransaction = () => {
		if (name.length === 0 || amount.length === 0 || date.length === 0) {
			toast({
				title: "Fill all required fields",
				description: "Fields marked with * are required",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			let transaction = {
				name,
				type,
				category,
				amount,
				date: new Date(date),
			};
			createTransaction(transaction)
				.then(() => {
					toast({
						title: "Transaction added",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
					onClose();
				})
				.catch((err) => {
					console.log(err);
					toast({
						title: "Transaction failed to add",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				});
		}
	};

	const resetForm = () => {
		setName("");
		setType("expense");
		setCategory(categories[0]);
		setAmount("");
		setDate("");
	};

	return (
		<>
			<Button onClick={onOpen} leftIcon={<FiPlusCircle />}>
				Add Record
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					resetForm();
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Transaction</ModalHeader>
					<ModalCloseButton
						onClick={() => {
							onClose();
							resetForm();
						}}
					/>
					<ModalBody>
						<FormControl isRequired my={2}>
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl isRequired my={2}>
							<FormLabel>Amount</FormLabel>
							<Input
								type="number"
								value={amount}
								onChange={(e) => {
									setAmount(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl my={2}>
							<FormLabel>Type</FormLabel>
							<Select
								variant="filled"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
								}}
							>
								<option value="expense">Expense</option>
								<option value="income">Income</option>
							</Select>
						</FormControl>
						<FormControl my={2}>
							<FormLabel>Category</FormLabel>
							<Select
								variant="filled"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}
							>
								{categories.map((label) => (
									<option value={label} key={label}>
										{label}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl isRequired my={2}>
							<FormLabel>Date</FormLabel>
							<Input
								value={date}
								onChange={(e) => setDate(e.target.value)}
								type="date"
								min="2021-01-01"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleCreateTransaction}>
							Add
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								onClose();
								resetForm();
							}}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
