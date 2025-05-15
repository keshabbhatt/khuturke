import {
  Card,
  CardHeader,
  Heading,
  Flex,
  IconButton,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Box,
  Text,
  CardBody,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from "prop-types";
import { useState } from "react";

function getWeekDates() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const startDate = new Date(today);

  // Calculate the starting day of the week (Monday)
  startDate.setDate(today.getDate() - currentDay + 1);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    weekDates.push({
      day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
      date: currentDate.getDate(),
      isCurrent: currentDate.toDateString() === today.toDateString(),
      isDone: false,
    });
  }

  return weekDates;
}

const weekDates = getWeekDates();
export function HabitWeeklyView({ habit }) {
  const { colorMode } = useColorMode();
  const [weekdays, setWeekdays] = useState(weekDates);

  function onHabitEntry(currentDate) {
    setWeekdays(
      weekdays.map((date) =>
        date.date === currentDate.date
          ? { ...date, isDone: !date.isDone }
          : date
      )
    );
    // if(currentDate.isDone) {
    //   //Delete entry
    // } else {
    //   //Add entry
    // }
  }
  return (
    <Card m={2}>
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Heading fontSize="md">{habit.name}</Heading>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FiMoreVertical />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem onClick={() => {}}>Edit</MenuItem>
                <MenuItem onClick={() => {}}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex justifyContent="space-evenly" alignItems="flex-end">
          {/* <Box>
            <IconButton icon={<FiChevronLeft />} />
          </Box> */}
          {weekdays.map((date) => (
            <Flex key={date.date} alignItems="center" flexDirection="column">
              <Text fontWeight={500}>{date.day.substring(0, 3)}</Text>
              <Flex
                mt={4}
                mb={1}
                p={1}
                borderRadius="50%"
                border={date.isCurrent ? "2px solid" : ""}
                borderColor={colorMode === "light" ? "gray.900" : "gray.600"}
                height="30px"
                width="30px"
                alignItems="center"
                justifyContent="center"
                backgroundColor={
                  date.isDone
                    ? habit.color
                    : colorMode === "light"
                    ? "gray.400"
                    : "gray.900"
                }
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  onHabitEntry(date);
                }}
                color={date.isDone || colorMode === "dark" ? "white" : "black"}
              >
                {date.date}
              </Flex>
            </Flex>
          ))}
          {/* <Box>
            <IconButton icon={<FiChevronRight />} />
          </Box> */}
        </Flex>
      </CardBody>
    </Card>
  );
}

HabitWeeklyView.propTypes = {
  habit: PropTypes.object,
};
