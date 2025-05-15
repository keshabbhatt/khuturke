import { extendTheme } from "@chakra-ui/react";

function getFont(font = "poppins") {
  switch (font) {
    case "poppins": {
      return {
        heading: `'Poppins', sans-serif`,
        body: `'Poppins', sans-serif`,
      };
    }
    case "raleway": {
      return {
        heading: `'Raleway Variable', sans-serif`,
        body: `'Raleway Variable', sans-serif`,
      };
    }
    case "permanent-marker": {
      return {
        heading: `'Permanent Marker', sans-serif`,
        body: `'Permanent Marker', sans-serif`,
      };
    }
    case "caveat": {
      return {
        heading: `'Caveat Variable', sans-serif`,
        body: `'Caveat Variable', sans-serif`,
      };
    }
  }
}

function getTheme(font = "poppins") {
  return extendTheme({
    fonts: getFont(font),
    initialColorMode: "dark",
    useSystemColorMode: false,
  });
}

export default getTheme;
