import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";

export function ConfirmationModal({
	isOpen = false,
	onClose,
	title = "Confirm action",
	body = "Are you sure you want perform this action?",
	trueButtonColor = "green",
	falseButtonColor = "red",
	trueButtonText = "Confirm",
	falseButtonText = "Cancel",
	trueButtonAction,
	falseButtonAction,
}) {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{body}</ModalBody>

				<ModalFooter>
					<Button
						mr={3}
						onClick={falseButtonAction}
						variant="ghost"
						colorScheme={falseButtonColor}
					>
						{falseButtonText}
					</Button>
					<Button
						colorScheme={trueButtonColor}
						variant="ghost"
						onClick={trueButtonAction}
					>
						{trueButtonText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
