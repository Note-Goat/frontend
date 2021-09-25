import {useContext, useState} from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Container from "../component/Container";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import {xhrGet, xhrPost} from "../util/xhr";
import Context from "../Context";
import {useHistory} from "react-router-dom";
import {useAuth} from "../hook/auth";

export default function LoginScreen() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { setNotebooks } = useContext(Context);

  const { setLoggedIn, accessToken, setAccessToken } = useAuth();

  const submitLogin = async () => {
    setIsError(false);

    const response = await xhrPost("session", {
      username,
      password,
    }, accessToken);

    if (response.status === 200) {
      const sessionData = await response.json();
      setAccessToken(sessionData["access_token"]);
      localStorage.setItem("access_token", sessionData["access_token"]);
      setNotebooks(await xhrGet("notebook", sessionData["access_token"]));
      setLoggedIn(true);
      history.push("/notebook");
      return;
    }

    setIsError(true);
  };

  return (
    <Container title="Login">
      <div className="inner-container">
        <TextInput
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={isError}
        />
        <TextInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          error={isError}
          helperText={isError ? "Username or password incorrect" : ""}
        />
        <Button
          title="Login"
          onClick={submitLogin}
          color="primary"
          icon={<VpnKeyIcon />}
        />
      </div>
    </Container>
  );
}
