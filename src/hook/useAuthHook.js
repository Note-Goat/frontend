import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export default function useAuthHook(appLoaded, loggedIn) {
  const history = useHistory();

  useEffect(() => {
    if (appLoaded && !loggedIn) {
      history.push("/login");
    }
  }, [
    appLoaded,
    loggedIn,
    history,
  ]);
}
