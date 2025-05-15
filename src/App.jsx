import { Container } from "@chakra-ui/react";
import SimpleSidebar from "./components/SideNav";
import { ChakraProvider } from "@chakra-ui/react";
import getTheme from "./theme.jsx";
import "@fontsource/poppins";
import "@fontsource-variable/raleway";
import "@fontsource/permanent-marker";
import "@fontsource-variable/caveat";
import "./App.css";

import { Outlet } from "react-router-dom";
import { useThemeStore } from "./theme-store";
function App() {
	const font = useThemeStore((state) => state.font);
	const background = useThemeStore((state) => state.background);
	return (
		<ChakraProvider theme={getTheme(font)}>
			<SimpleSidebar className={`body-${background}`}>
				<Container maxW="6xl">
					<Outlet />
				</Container>
			</SimpleSidebar>
		</ChakraProvider>
	);
}

export default App;
