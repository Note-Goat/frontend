import {useContext, useEffect} from "react";
import {xhrDelete} from "../util/xhr";
import {useHistory} from "react-router-dom";
import Context from "../Context";

export default function LogoutScreen() {
  const history = useHistory();
  const { setLoggedIn } = useContext(Context);

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
