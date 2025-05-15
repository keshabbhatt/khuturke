import { Box, Heading, Text, Button, Input, VStack, Progress } from "@chakra-ui/react";
import { useState } from "react";

export const GoalPage = () => {
	const [goal, setGoal] = useState("");
	const [amountSaved, setAmountSaved] = useState(0);
	const [goalAmount, setGoalAmount] = useState(0);

	const handleSetGoal = () => {
		if (goal && goalAmount > 0) {
			alert(`Goal "RS{goal}" has been set!`);
		} else {
			alert("Please enter a valid goal and amount.");
		}
	};

	const handleSave = () => {
		if (amountSaved > 0 && amountSaved <= goalAmount) {
			alert(`Saved $${amountSaved} towards your goal.`);
		} else {
			alert("Please enter a valid saving amount.");
		}
	};

	const progress = (amountSaved / goalAmount) * 100 || 0;

	return (
		<Box p={6} maxW="lg" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="md">
			<Heading mb={4}>Set Your Financial Goal</Heading>
			<VStack spacing={4} align="stretch">
				<Text>What is your goal?</Text>
				<Input
					placeholder="E.g., Save for vacation, study"
					value={goal}
					onChange={(e) => setGoal(e.target.value)}
				/>

				<Text>How much do you want to save?</Text>
				<Input
					type="number"
					placeholder="E.g., 5000"
					value={goalAmount}
					onChange={(e) => setGoalAmount(Number(e.target.value))}
				/>

				<Button colorScheme="blue" onClick={handleSetGoal}>
					Set Goal
				</Button>
			</VStack>

			<Box mt={8}>
				<Heading size="md" mb={2}>
					Track Your Progress
				</Heading>
				{goal && (
					<>
						<Text mb={2}>
							Goal: <strong>{goal}</strong>
						</Text>
						<Text mb={2}>
							Target Amount: <strong>${goalAmount}</strong>
						</Text>
						<Text mb={2}>
							Amount Saved: <strong>${amountSaved}</strong>
						</Text>
						<Progress value={progress} size="lg" colorScheme="green" borderRadius="md" />
					</>
				)}
				<VStack mt={4} spacing={4} align="stretch">
					<Text>Enter the amount you saved:</Text>
					<Input
						type="number"
						placeholder="E.g., 500"
						value={amountSaved}
						onChange={(e) => setAmountSaved(Number(e.target.value))}
					/>
					<Button colorScheme="green" onClick={handleSave}>
						Save Amount
					</Button>
				</VStack>
			</Box>
		</Box>
	);
};
