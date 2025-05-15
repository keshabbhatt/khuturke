import { Flex, Icon } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

export function SingleToggleColorSelect({ colors, onChange, selectedColor }) {
  return (
    <Flex justifyContent="space-evenly">
      {colors.map((color) => (
        <Flex
          key={color}
          borderRadius={25}
          height={6}
          width={6}
          backgroundColor={color}
          alignItems="center"
          justifyContent="center"
          onClick={() => onChange(color)}
        >
          {selectedColor === color && <Icon as={FiCheck} />}
        </Flex>
      ))}
    </Flex>
  );
}
