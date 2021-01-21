import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      grey50: string;
      grey400: string;
      grey700: string;
    };
  }
}
