/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Center,
  Flex,
} from "@chakra-ui/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import RadioSelect from "./RadioSelect";

export function CreateEditBudgetItemModal({
  isEdit = false,
  onItemAction,
  budgetItem = null,
  onClose,
}) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [form, setForm] = useState(
    budgetItem ?? {
      emoji: "1f4b8",
      bgColor: "#FFF5C2",
    }
  );
  const toast = useToast();

  const handleAction = () => {
    if (form.name.length === 0 || form.allocated.length === 0) {
      toast({
        title: "Fill all required fields",
        description: "Fields marked with * are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      let currentBudgetItem = {
        emoji: form.emoji,
        bgColor: form.bgColor,
        name: form.name,
        allocated: form.allocated,
      };
      if (isEdit) {
        currentBudgetItem.id = budgetItem.id;
      }
      onItemAction(currentBudgetItem);
      onClose();
    }
  };

  const resetForm = () => {
    setForm(
      budgetItem ?? {
        emoji: "1f4b8",
        bgColor: "#FFF5C2",
      }
    );
  };

  const onEmojiSelect = (emojiData) => {
    setForm((prev) => {
      return { ...prev, emoji: emojiData.unified };
    });
    setIsEmojiPickerOpen(false);
  };

  return (
    <>
      <Modal isOpen>
        <ModalOverlay />
        <ModalContent my={4}>
          <ModalHeader>{isEdit ? "Edit" : "Create"} Budget Item</ModalHeader>
          <ModalBody>
            <Center onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                p={2}
                bgColor={form.bgColor}
                borderRadius={"25px"}
              >
                <Emoji unified={form.emoji} emojiStyle="native" />
              </Flex>
            </Center>
            {isEmojiPickerOpen && (
              <Center mt={5}>
                <EmojiPicker onEmojiClick={onEmojiSelect} emojiStyle="native" />
              </Center>
            )}
            <FormControl isRequired my={2}>
              <FormLabel>Color</FormLabel>
              <RadioSelect
                options={[
                  "#FFF5C2",
                  "#FF8F8F",
                  "#9ADE7B",
                  "#508D69",
                  "#7071E8",
                  "#C683D7",
                  "#FFC7C7",
                  "#9EB8D9",
                ]}
                selected={form.bgColor}
                onSelect={(option) => {
                  setForm((prev) => {
                    return { ...prev, bgColor: option };
                  });
                }}
              />
            </FormControl>
            <FormControl isRequired my={2}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={form?.name ?? ""}
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </FormControl>
            <FormControl isRequired my={2}>
              <FormLabel>Allocation</FormLabel>
              <Input
                type="number"
                value={form?.allocated ?? 0}
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, allocated: e.target.value };
                  });
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAction}>
              {isEdit ? "Edit" : "Add"}
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => {
                onClose();
                resetForm();
              }}
            >
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
