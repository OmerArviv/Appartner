import "./App.css";
import { useContext } from "react";
import React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { authContext, AuthProvider, PageTitleProvider } from "./APP/Utils";
import GeneralBrawser from "./GeneralBrawser";

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#fff",
//       contrastText: "black",
//     },
//   },
// });

// const MyThemeComponent = styled("div")(({ theme }) => ({
//   color: theme.palette.primary.contrastText,
//   backgroundColor: theme.palette.primary.main,
//   padding: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
// }));

function App() {
  const { authenticated } = useContext(authContext);

  return (
    <PageTitleProvider>
      <AuthProvider>
        {/* <ThemeProvider theme={customTheme}> */}
        {/* <MyThemeComponent> */}
        <GeneralBrawser></GeneralBrawser>
        {/* </MyThemeComponent> */}
        {/* </ThemeProvider> */}
      </AuthProvider>
    </PageTitleProvider>
  );
}

export default App;
