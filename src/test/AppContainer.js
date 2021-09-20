import Context from "../Context";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "../hook/auth";
import ThemeProvider from "../util/ThemeProvider";

export default function AppContainer({ children }) {
  const appContext = {};
  const accessToken = "";

  return (
    <Context.Provider value={appContext}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider providedAccessToken={accessToken}>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Context.Provider>
  );
}
