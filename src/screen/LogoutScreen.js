import {useContext, useEffect} from "react";
import {xhrDelete} from "../util/xhr";
import {useHistory} from "react-router-dom";
import Context from "../Context";
import {useAuth} from "../hook/auth";

export default function LogoutScreen() {
  const history = useHistory();
  const { setLoggedIn } = useAuth();

  useEffect(() => {
    (async function() {
      await xhrDelete("session");
      localStorage.removeItem("access_token");
      setLoggedIn(false);
      history.push("/");
    })();
  }, []);

  return (
    <div />
  );
}
