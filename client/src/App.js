import "./App.css";
import { useContext } from "react";
import React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { authContext, AuthProvider, PageTitleProvider } from "./APP/Utils";
import GeneralBrawser from "./GeneralBrawser";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#7F8487",
      contrastText: "black",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const MyThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  typography: theme.typography.fontFamily,
}));

function App() {
  const { authenticated } = useContext(authContext);

  return (
    <PageTitleProvider>
      <AuthProvider>
        <ThemeProvider theme={customTheme}>
          <MyThemeComponent>
            <GeneralBrawser></GeneralBrawser>
          </MyThemeComponent>
        </ThemeProvider>
      </AuthProvider>
    </PageTitleProvider>
  );
}

export default App;
