import {useContext, useState} from "react";
import StarIcon from '@material-ui/icons/Star';
import Container from "../component/Container";
import Context from "../Context";
import {xhrPost} from "../util/xhr";
import TextInput from "../component/TextInput";
import Button from "../component/Button";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { setLoggedIn, accessToken } = useContext(Context);

  const submitSignup = () => {
    (async function() {
      setIsError(false);
      const response = await xhrPost("user", {
        username,
        password,
      }, accessToken);
      if (response.status === 200) {
        await xhrPost("session", {
          username,
          password,
        }, accessToken);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    })();
  };

  return (
    <Container title="Signup">
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
        helperText={isError ? "There was an error" : ""}
      />
      <Button
        title="Signup"
        onClick={submitSignup}
        color="primary"
        icon={<StarIcon />}
      />
    </Container>
  );
}
