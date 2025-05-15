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
  Center,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { createBudgetItem } from "../db/budget-items";

export function CreateBudgetItem({ onItemCreate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [emoji, setEmoji] = useState("1f4b8");
  const toast = useToast();

  const handleCreateBudgetItem = () => {
    if (category.length === 0 || amount.length === 0) {
      toast({
        title: "Fill all required fields",
        description: "Fields marked with * are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      let budgetItem = {
        emoji,
        type,
        category,
        amount,
      };
      createBudgetItem(budgetItem)
        .then((_data) => {
          toast({
            title: "Budget Item created successfully!",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
          resetForm();
          onClose();
          onItemCreate();
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Failed to add Budget Item!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const resetForm = () => {
    setType("expense");
    setCategory("");
    setAmount("");
    setEmoji("1f4b8");
  };

  const onEmojiSelect = (emojiData, e) => {
    setEmoji(emojiData.unified);
    setIsEmojiPickerOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiPlusCircle />}>
        Create Item
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetForm();
        }}
      >
        <ModalOverlay />
        <ModalContent my={4}>
          <ModalHeader>Add Budget Item</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              resetForm();
            }}
          />
          <ModalBody>
            <Center onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
              <Emoji unified={emoji} emojiStyle="native" />
            </Center>
            {isEmojiPickerOpen && (
              <Center mt={5}>
                <EmojiPicker onEmojiClick={onEmojiSelect} emojiStyle="native" />
              </Center>
            )}
            <FormControl isRequired my={2}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateBudgetItem}>
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
