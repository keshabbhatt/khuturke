import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeStore } from "../theme-store";

export function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const font = useThemeStore((state) => state.font);
  const background = useThemeStore((state) => state.background);
  const changeFont = useThemeStore((state) => state.changeFont);
  const changeBackground = useThemeStore((state) => state.changeBackground);

  function onFontChange(e) {
    changeFont(e.target.value);
  }

  function onBackgroundChange(e) {
    changeBackground(e.target.value);
  }
  return (
    <Box>
      <Heading mb="2rem">Settings</Heading>
      <Card>
        <CardHeader mb="1rem">
          <Heading>UI</Heading>
        </CardHeader>
        <CardBody>
          <FormControl display="flex" alignItems="center" mb="1rem">
            <FormLabel mb="0" display="flex" alignItems="center">
              <Icon mr="2" fontSize="16" as={FiMoon} />
              Dark
            </FormLabel>
            <Switch
              onChange={toggleColorMode}
              isChecked={colorMode === "light"}
            />
            <FormLabel mb="0" ml="1rem" display="flex" alignItems="center">
              <Icon mr="2" fontSize="16" as={FiSun} />
              Light
            </FormLabel>
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Background</FormLabel>
            <Select onChange={onBackgroundChange} value={background}>
              <option value="plain">Plain</option>
              <option value="dotted">Dotted</option>
              <option value="grid">Grid</option>
            </Select>
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Font</FormLabel>
            <Select onChange={onFontChange} value={font}>
              <option value="poppins">Poppins</option>
              <option value="raleway">Raleway</option>
              <option value="permanent-marker">Permanent Marker</option>
              <option value="caveat">Caveat</option>
            </Select>
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Font Color</FormLabel>
            <Select onChange={onFontChange} value={font}>
              <option value="poppins">Poppins</option>
              <option value="raleway">Raleway</option>
              <option value="permanent-marker">Permanent Marker</option>
              <option value="caveat">Caveat</option>
            </Select>
          </FormControl>
        </CardBody>
      </Card>
    </Box>
  );
}
