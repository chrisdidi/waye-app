import { DefaultTheme } from "styled-components";

const mainFont = "Montserrat_400Regular";
const mainFontLight = "Montserrat_300Light";
const mainFontSemiBold = "Montserrat_600SemiBold";
const mainFontBold = "Montserrat_700Bold";

const theme: DefaultTheme = {
  borderRadius: "18px",

  mainFont: mainFont,
  mainFontLight: mainFontLight,
  mainFontSemiBold: mainFontSemiBold,
  mainFontBold: mainFontBold,
  colors: {
    main: "#FA8071",
    secondary: "#2D3683",
    grey50: "#F9FAFB",
    grey400: "#9CA3AF",
    grey700: "#374151",
    red200: "#FECACA",
    red400: "#F87171",
    red500: "#EF4444",
    red700: "#B91C1C",
  },
};

export { theme };
