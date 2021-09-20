import {useState} from "react";
import './App.css';
import Context from "./Context";
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
import RenameNotebookScreen from "./screen/RenameNotebookScreen";
import NotebookScreen from "./screen/NotebookScreen";
import NoteScreen from "./screen/NoteScreen";
import KeyScreen from "./screen/KeyScreen";
import PasswordResetScreen from "./screen/PasswordResetScreen";
import AccountScreen from "./screen/AccountScreen";
import SplashScreen from "./screen/SplashScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import {AuthProvider} from "./hook/auth";
import ThemeProvider from "./util/ThemeProvider";

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [notes, setNotes] = useState({});
  const accessToken = localStorage.getItem("access_token");

  const appContext = {
    notebooks,
    setNotebooks,
    notes,
    setNotes,
  };

  return (
    <Context.Provider value={appContext}>
      <ThemeProvider>
        <Router>
          <AuthProvider providedAccessToken={accessToken}>
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
                <SplashScreen />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>
      </ThemeProvider>
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
