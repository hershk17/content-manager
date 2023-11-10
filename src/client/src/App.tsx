import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ThemeProvider from "./providers/ThemeProvider";
import Router from "./router";

function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
