import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: '#DDBBD4',
      main: '#954B83',
      dark: '#44223B',
      contrastText: '#eee',
    },
    secondary: {
      light: '#EDEAE8',
      main: '#BFB5AF',
      dark: '#39322D',
      contrastText: '#171412',
    },
  },
});

export default function ThemeProvider({children}) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}
