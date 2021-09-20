import {createTheme} from "@material-ui/core/styles";
import {colors} from "../constants";

export default createTheme({
  palette: {
    primary: {
      light: '#f18970',
      main: colors.burntSienna,
      dark: '#a64b35',
      contrastText: '#eee',
    },
    secondary: {
      light: '#535b67',
      main: colors.gunMetal,
      dark: '#111',
      contrastText: '#eee',
    },
  },
});
