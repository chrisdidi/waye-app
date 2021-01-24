import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    mainFont: string;
    mainFontLight: string;
    mainFontBold: string;
    mainFontSemiBold: string;
    colors: {
      main: string;
      secondary: string;
      grey50: string;
      grey100: string;
      grey200: string;
      grey400: string;
      grey700: string;
      red200: string;
      red400: string;
      red500: string;
      red700: string;
    };
  }
}
