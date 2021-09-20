import {useHistory} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {xhrGet} from "../util/xhr";
import Context from "../Context";

const AuthContext = createContext(null);

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/privacy",
  "/contact",
];

export const AuthProvider = ({ providedAccessToken, children }) => {
  const history = useHistory();
  const [appLoaded, setAppLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(providedAccessToken);
  const { setNotebooks } = useContext(Context);

  useEffect(() => {
    (async function() {
      if (accessToken) {
        try {
          const sessionData = await xhrGet("session", accessToken);
          setLoggedIn(sessionData['loggedIn'] ?? false);
          if (sessionData['loggedIn']) {
            setNotebooks(await xhrGet("notebook", accessToken));
          }
        } catch (e) {
        }
      }
      setAppLoaded(true);
    })();
  }, [accessToken]);

  useEffect(() => {
    const loginRedirectRequired = appLoaded
      && !loggedIn
      && !publicRoutes.find((route) => route === history.location.pathname);
    if (loginRedirectRequired) {
      history.push("/login");
    }
  }, [
    appLoaded,
    loggedIn,
    history,
  ]);

  return <AuthContext.Provider value={{appLoaded, setAppLoaded, loggedIn, setLoggedIn, accessToken, setAccessToken }}>
    {children}
  </AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
