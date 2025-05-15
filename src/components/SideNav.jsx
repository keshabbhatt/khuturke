import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiFileText,
  FiDollarSign,
  FiGrid,
  FiCheckCircle,
  FiCalendar,
  FiBook,
  FiTarget,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { Emoji, EmojiStyle } from "emoji-picker-react";

const LinkItems = [
  { name: "Transactions", icon: FiHome, route: "/" },
  { name: "Budgets", icon: FiDollarSign, route: "/budgets" },
  { name: "Budget Categories", icon: FiGrid, route: "/budget-categories" },
  { name: "Goals", icon: FiTarget, route: "/goal" },
  { name: "Bills Reminder", icon: FiCalendar, route: "/bill" },
  { name: "Habit Tracker", icon: FiCheckCircle, route: "/habits" },
  { name: "Notes", icon: FiBook, route: "/notes" },
  { name: "Settings", icon: FiSettings, route: "/settings" },
];

export default function SimpleSidebar({ children, className }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" className={className}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-evenly">
        <Text fontSize="2xl" fontWeight="bold">
        Khutruke
        </Text>
        <Emoji unified="1f911" size="25" emojiStyle={EmojiStyle.Native} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          colorMode={colorMode}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ colorMode, route, icon, children, ...rest }) => {
  return (
    <Link to={route}>
      <Flex
        align="center"
        p="4"
        mx="4"
        my={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        backgroundColor={colorMode == "light" ? "gray.300" : "gray.800"}
        _hover={
          colorMode == "light"
            ? {
                bg: "gray.400",
                color: "gray.100",
              }
            : {
                bg: "cyan.400",
                color: "gray.100",
              }
        }
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontWeight="bold">
        khuturke
      </Text>
    </Flex>
  );
};
