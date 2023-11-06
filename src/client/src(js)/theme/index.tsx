import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as MUIThemeProvider, Theme, ThemeOptions } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { customShadows } from "./custom-shadows";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    palette: any;
    typography: any;
    shadows: any;
    customShadows: any;
    shape: any;
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    palette: any;
    typography: any;
    shadows: any;
    customShadows: any;
    shape: any;
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

interface ThemeProviderProps {
  children?: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  // TODO: Add strong type checking
  const theme = createTheme(memoizedValue);
  theme.components = overrides(theme) as any;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
