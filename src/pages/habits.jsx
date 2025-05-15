import {
  Heading,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { SingleToggleColorSelect } from "../components/SingleToggleSelect";
import { useState } from "react";
import { HabitWeeklyView } from "../components/HabitWeeklyView";

const colors = [
  "#FF5733",
  "#0047AB",
  "#088F8F",
  "#F0E68C",
  "#B2BEB5",
  "#A52A2A",
  "#800080",
  "#7F00FF",
];

export function HabitsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [selectedColor, setSelectedColor] = useState(colors[0]);

  function onColorChange(color) {
    console.log(color);
    setSelectedColor(color);
  }
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">
        <Heading>Habit Tracker</Heading>
        <Box>
          <Button leftIcon={<FiPlusCircle />} onClick={onOpen}>
            New Habit
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Habit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired my={2}>
                <FormLabel>Name</FormLabel>
                <Input />
              </FormControl>
              <FormControl my={2}>
                <FormLabel>Color</FormLabel>
                <SingleToggleColorSelect
                  colors={colors}
                  onChange={onColorChange}
                  selectedColor={selectedColor}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <SimpleGrid columns={2}>
        <HabitWeeklyView
          start={new Date()}
          habit={{ name: "Gym", color: colors[0] }}
        />
        <HabitWeeklyView
          start={new Date()}
          habit={{ name: "Gym", color: colors[1] }}
        />
      </SimpleGrid>
    </Flex>
  );
}
