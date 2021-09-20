import Context from "../Context";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "../util/theme";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "../hook/auth";

export default function AppContainer({ children }) {
  const appContext = {};
  const accessToken = "";

  return (
    <Context.Provider value={appContext}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider providedAccessToken={accessToken}>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    </Context.Provider>
  );
}
