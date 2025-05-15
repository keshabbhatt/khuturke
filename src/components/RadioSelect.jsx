import { Flex } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";
import PropTypes from "prop-types";
export default function RadioSelect({
  // isMultiSelect = false,
  options = null,
  onSelect,
  selected,
}) {
  let [currentSelection, setCurrentSelection] = useState(selected);
  function handleSelection(option) {
    setCurrentSelection(option);
    onSelect(option);
  }
  return (
    <Flex>
      {options &&
        options.map((option) => (
          <Flex
            key={option}
            h={"20px"}
            w={"20px"}
            m={"5px"}
            borderRadius={"25px"}
            bgColor={option}
            onClick={() => handleSelection(option)}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {currentSelection === option && (
              <Flex bgColor={"rgba(0,0,0,0.5)"} borderRadius={"25px"}>
                <FiCheck />
              </Flex>
            )}
          </Flex>
        ))}
    </Flex>
  );
}

RadioSelect.propTypes = {
  // isMultiSelect: PropTypes.bool,
  options: PropTypes.array,
  onSelect: PropTypes.func,
  selected: PropTypes.string,
};
