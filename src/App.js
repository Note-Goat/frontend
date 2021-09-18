import {useEffect, useState} from "react";
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';
import {xhrGet} from "./util/xhr";
import Context from "./Context";
import {colors} from "./constants";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";
import NotebookListScreen from "./screen/NotebookListScreen";
import NewNotebookScreen from "./screen/NewNotebookScreen";
import LogoutScreen from "./screen/LogoutScreen";
import PrivacyScreen from "./screen/PrivacyScreen";
import ContactScreen from "./screen/ContactScreen";
import HomeScreen from "./screen/HomeScreen";
import RenameNotebookScreen from "./screen/RenameNotebookScreen";
import NotebookScreen from "./screen/NotebookScreen";
import NoteScreen from "./screen/NoteScreen";
import KeyScreen from "./screen/KeyScreen";
import PasswordResetScreen from "./screen/PasswordResetScreen";
import AccountScreen from "./screen/AccountScreen";
import SplashScreen from "./screen/SplashScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";

const theme = createTheme({
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

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [notes, setNotes] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    (async function() {
      if (accessToken) {
        try {
          const sessionData = await xhrGet("session", accessToken);
          setLoggedIn(sessionData['loggedIn']);
          if (sessionData['loggedIn']) {
            setNotebooks(await xhrGet("notebook", accessToken));
          }
        } catch (e) {
        }
      }
    })();
  }, []);

  const appContext = {
    notebooks,
    setNotebooks,
    notes,
    setNotes,
    loggedIn,
    setLoggedIn,
    accessToken,
    setAccessToken,
  };

  return (
    <Context.Provider value={appContext}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/notebook/:notebookUuid">
              <Notebook />
            </Route>
            <Route path="/notebook">
              <NotebookListScreen />
            </Route>
            <Route path="/new-notebook">
              <NewNotebookScreen />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/logout">
              <LogoutScreen />
            </Route>
            <Route path="/privacy">
              <PrivacyScreen />
            </Route>
            <Route path="/contact">
              <ContactScreen />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/signup">
              <SignupScreen />
            </Route>
            <Route path="/">
              { loggedIn ? <HomeScreen /> : <SplashScreen /> }
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Context.Provider>
  );
}

function Notebook() {
  const { path } = useRouteMatch();

  return <Switch>
    <Route path={`${path}/rename`}>
      <RenameNotebookScreen />
    </Route>
    <Route exact path={path}>
      <NotebookScreen />
    </Route>
    <Route path={`${path}/note/:noteUuid`}>
      <NoteScreen />
    </Route>
  </Switch>
}

function Account() {
  const { path } = useRouteMatch();

  return <Switch>
    <Route path={`${path}/key`}>
      <KeyScreen />
    </Route>
    <Route path={`${path}/password-reset`}>
      <PasswordResetScreen />
    </Route>
    <Route exact path={path}>
      <AccountScreen />
    </Route>
  </Switch>
}

export default App;
