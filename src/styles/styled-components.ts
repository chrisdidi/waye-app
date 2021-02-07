import * as styledComponents from "styled-components/native";

const {
  default: styled,
  css,
  ThemeProvider,
  withTheme,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<styledComponents.DefaultTheme>;

export { css, ThemeProvider, withTheme };
export default styled;
